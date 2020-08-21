import Page from '../../components/Page'
import React from 'react';
import { connect } from 'react-redux'
import {
    Card,
    CardBody,
    Row,
    Col,
    FormGroup,
    Label,
    Alert,
    Table,
    Button,
} from 'reactstrap'
import CreatableSelect from 'react-select/creatable';
import VotingActions from '../../redux/votingRedux'
import PageSpinner from '../../components/PageSpinner';
import DetailsHeader from '../../components/DetailsHeader'
import DetailsBody from '../../components/DetailsBody'
import { Redirect } from 'react-router-dom';
import Delete from '../../components/Delete';
import QuestionResults from '../../components/voting/QuestionResults'
import { shouldObjectBeUpdated, getQuestionStatus, accepted, isQuestionSecret, unknown } from '../../utils/functions';
import { Dialog, Slide, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const emptyQuestion = {
    questionText: '',
    isOpen: false,
    majorityID: 1,
    resolvedOn: null,
    sumYes: 0,
    sumNo: 0,
    SumAbstention: 0,
    vote: "Ja;Nein;Enthaltung",
    arrivedCouncilCount: 0,
}

class QuestionDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            question: null,
            redirect: false,
            confirmOpen: false,
            questionProperties: [
                { name: 'Frage', type: 'text', id: 'questionText', md: 6, xs: 12},
                { name: 'Status', type: 'select', id: 'isOpen', options: [
                    { value: true, name: 'Öffentlich'},
                    { value: false, name: 'Entwurf'},
                ], md: 6, xs: 12},
                { name: 'Mehrheit', type: 'select', id: 'majorityID', options: [], md: 6, xs: 12},
                { name: 'Abgestimmt am', type: 'datetime-local', max: '2100-12-31T23:59', id: 'resolvedOn', md: 6, xs: 12},
                { name: 'Dafür', type: 'number', id: 'sumYes', min: 0, max: 999, md: 6, xs: 12},
                { name: 'Dagegen', type: 'number', id: 'sumNo', min: 0, max: 999, md: 6, xs: 12},
                { name: 'Enthaltung', type: 'number', id: 'sumAbstention', min: 0, max: 999, md: 6, xs: 12},
                { name: 'Angereiste Fachschaften', type: 'number', id: 'arrivedCouncilCount', min: 0, max: 999, md: 6, xs: 12},
            ]
        }
    }

    renderMajoritySelect() {
        return (
            <FormGroup>
                <Label for="select">Mehrheit</Label>
                <CreatableSelect
                    isClearable
                    onChange={val => console.log('selected', val)}
                    onInputChange={(e) => console.log(e)}
                    options={this.props.majorityList}
                />
            </FormGroup>
        )
    }

    componentDidMount() {
        if (this.props.empty) {
            this.setState({ question: emptyQuestion, editing: true})
        } else {
            const { id } = this.props.match.params
            this.props.getQuestion(id)
        }
        this.props.getMajorityList();
    }

    componentDidUpdate() {
        const { question } = this.props
        if(shouldObjectBeUpdated(this.state.question, question, this.state.editing)) {
            this.setState({ question})
        }
        this.addMajorities()
        if (this.props.empty && this.state.question && this.state.question.arrivedCouncilCount === 0 && this.props.conference && this.props.conference.arrivedCouncilCount) {
            this.setState({ question: {...this.state.question, arrivedCouncilCount: this.props.conference.arrivedCouncilCount}})
        }
    }

    componentWillUnmount() {
        this.props.clearFetching()
        this.props.clearSuccess()
    }

    addMajorities() {
        const { questionProperties } = this.state
        const options = questionProperties[2].options
        if (options.length === 0 && this.props.majorityList.length > 0) {
            questionProperties[2].options = this.props.majorityList.map(x => ({name: x.name, value: x.majorityID}))
            this.setState({ questionProperties })
        } 
    }

    onSave() {
        this.props.updateExistingQuestion(this.state.question)
        this.setState({ editing: false })
        const { id } = this.props.match.params
        this.props.getQuestion(id)
    }

    onDelete() {
        this.props.deleteQuestion(this.props.question.questionID);
        this.setState({ editing: false, redirect: true});
    }

    onConfirm() {
        this.setState({ confirmOpen: false})
        this.props.closeQuestion(this.props.question.questionID)
    }

    renderConfirm() {
        return (
            <Dialog
                open={this.state.confirmOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => this.setState({ confirmOpen: false})}
                aria-labelledby="title"
                aria-describedby="description"
            >
                <DialogTitle id="title">Bist du dir sicher?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="description">
                        Möchtest du diese Abstimmung wirklich schließen?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button outline onClick={() => this.setState({ confirmOpen: false})} color="primary">Abbrechen</Button>
                    <Button outline onClick={() => this.onConfirm()} color="danger">Schließen</Button>
                </DialogActions>
            </Dialog>
        )
    }

    renderVoteLists(question) {
        if (isQuestionSecret(question) || !question.answerList || question.answerList.length === 0) {
            return <Alert color="warning">Antworten nicht einsehbar</Alert>
        }

        return (
            <Table responsive borderd="true" striped hover>
                <thead><tr>
                    <th>#</th>
                    <th>Fachschaft</th>
                    <th>Stimme</th> 
                    <th>Priorität</th> 
                </tr></thead>
                <tbody>
                    { question.answerList.map((x, index) => 
                        <tr key={x.answerID}>
                            <th scope="row">{index+1}</th>
                            <td>{x.council ? x.council.name : "unbekannt"}</td>
                            <td>{x.vote}</td>
                            <td>{x.priority}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }

    renderResults() {
        const { question } = this.props
        if (getQuestionStatus(question) === unknown) {
            return <Alert color="warning">Mehrheiten konnten nicht geladen werden. Status der Abstimmung unklar.</Alert>
        }
        return (
            <Col>
                <Row>
                <Col><QuestionResults accepted={getQuestionStatus(question) === accepted} question={question} /></Col>
                </Row>
                <Row>
                    <Col>{ this.renderVoteLists(question) }</Col>
                </Row>
            </Col>
        )
    }

    isDataAvailable() {
        return this.state.question && this.props.majorityList && this.props.majorityList.length > 0
    }

    render() {
        const { empty, error, success } = this.props;
        const { question, editing, redirect } = this.state;
        return (
            <Page
                className="QuestionsDetailsPage"
                title={ empty ? 'Neue Abstimmung erstellen' : 'Abstimmung-Details'}
            >
                <Row>
                    <Col>
                        <Card>
                            { ((success && empty ) || redirect) && <Redirect to="/question"/>}
                            { !this.isDataAvailable() && !error && <CardBody><PageSpinner /></CardBody>}
                            { error && <CardBody><Alert color="danger">Keine Frage mit dieser ID gefunden</Alert></CardBody>}
                            { question && this.props.majorityList && this.props.majorityList.length > 0 &&
                                <div>
                                    <DetailsHeader
                                        title={empty ? 'Neue Abstimmung' : question.name}
                                        empty={empty}
                                        onCreate={() => this.props.createNewQuestion(question)}
                                        editing={editing}
                                        onEdit={() => this.setState({ editing: true})}
                                        onCancel={() => this.setState({ editing: false, question: this.props.question})}
                                        onSave={() => this.onSave()}
                                        disabled={false}
                                    />
                                    <DetailsBody
                                        disabled={!editing}
                                        object={question}
                                        onChange={(id, value) => this.setState({ question: {...question, [id]: value}})}
                                        properties={this.state.questionProperties}
                                    />
                                    { !question.resolvedOn && !empty && 
                                        <CardBody>
                                            <Button block onClick={() => this.setState({ confirmOpen: true})}>Frage schließen</Button>
                                        </CardBody>
                                    }
                                    <Delete 
                                        show={editing && !empty}
                                        onDelete={() => this.onDelete()}
                                        type="diese Abstimmung"
                                        name={question.name}
                                    />
                                    { question.resolvedOn && !this.state.editing && this.renderResults()}
                                    { this.renderConfirm() }
                                </div>
                            }
                        </Card>
                    </Col>
                </Row>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        question: state.voting.question,
        error: state.voting.error,
        success: state.voting.success,
        fetching: state.voting.fetching,
        majorityList: state.voting.majorityList,
        answerList: state.voting.answerList,
        conference: state.conference.conference,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getQuestion: (id) => dispatch(VotingActions.getQuestion(id)),
        clearFetching: () => dispatch(VotingActions.updateFetching(false)),
        clearSuccess: () => dispatch(VotingActions.updateSuccess(false)),
        createNewQuestion: (question) => dispatch(VotingActions.createNewQuestion(question)),
        updateExistingQuestion: (question) => dispatch(VotingActions.updateExistingQuestion(question)),
        deleteQuestion: (id) => dispatch(VotingActions.deleteQuestion(id)),
        getMajorityList: () => dispatch(VotingActions.getMajorityList()),
        getAnswerList: (id) => dispatch(VotingActions.getAnswerList(id)),
        closeQuestion: (id => dispatch(VotingActions.closeQuestion(id))),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailsPage);
