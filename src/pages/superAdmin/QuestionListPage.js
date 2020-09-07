import Page from '../../components/Page'
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Table,
  Button,
} from 'reactstrap'
import Delay from '../../components/Delay'
import VotingActions from '../../redux/votingRedux';
import SearchInput from '../../components/SearchInput';
import {Link} from 'react-router-dom';
import {
    FaPlus
  } from 'react-icons/fa';
import moment from 'moment';
import Empty from '../../components/Empty'
import { getQuestionStatusText, getQuestionStatus, draft, open } from '../../utils/functions'
import ButtonWithTimeout from '../../components/voting/ButtonWithTimeout';
import PageSpinner from '../../components/PageSpinner';
require('moment/locale/de.js')



class QuestionListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            selectedStart: '',
            isOpen: false,
        }
    }

    componentDidMount() {
        this.props.getQuestionList();
        if (!this.props.majorityList || this.props.majorityList.length === 0) {
            this.props.getMajorityList();
        }
    }

    getFilteredquestionList() {
        const search = this.state.search.toLowerCase().trim()
        return this.props.questionList.filter(x => (x.questionText && x.questionText.toLowerCase().includes(search)))
    }

    getMajorityName(question) {
        const { majorityList } = this.props;
        if (!majorityList) {
            return 'unbekannt'
        } else {
            const majority = majorityList.find(x => x.majorityID === question.majorityID)
            return majority ? majority.name : 'unbekannt'
        }
    }

    openQuestion(question) {
        var newQuestion = {...question}
        newQuestion.isOpen = true
        this.props.updateExistingQuestion(newQuestion)
    }

    getStatusButton(question) {
        const status = getQuestionStatus(question)
        if (status === draft) {
            return <Button onClick={() => this.openQuestion(question)}>Frage öffnen</Button>
        } else if (status === open) {
            return <Button onClick={() => this.props.closeQuestion(question.questionID)}>Frage schließen</Button>
        } else {
            return getQuestionStatusText(question)
        }
    }

    renderList() {
        return (
            <Table responsive borderd="true" striped hover>
                <thead><tr>
                    <th>#</th>
                    <th>Text</th>
                    <th>Mehrheit</th> 
                    <th>Dafür</th> 
                    <th>Dagegen</th>
                    <th>Enthaltungen</th>
                    <th>Zeitpunkt</th>
                    <th>Status</th>
                </tr></thead>
                <tbody>
                    { [...this.getFilteredquestionList()].sort((a,b) => moment(a.resolvedOn).isBefore(b.resolvedOn) ? 1 : -1).map((x, i) => this.getQuestionRow(x, i))}
                </tbody>
            </Table>
        )
    }


    getQuestionRow(question, index) {
        return (
            <tr 
                key={question.questionID}
                onClick={() => this.props.history.push('/question/' + question.questionID)}
            >
                <th scope="row">{index+1}</th>
                <td>{question.questionText}</td>
                <td>{this.getMajorityName(question)}</td>
                <td>{question.sumYes}</td>
                <td>{question.sumNo}</td>
                <td>{question.sumAbstention}</td>
                <td>{question.resolvedOn ? moment(question.resolvedOn).format('ddd, HH:mm') : ""}</td>
                <td onClick={e => e.stopPropagation()}>{this.getStatusButton(question)}</td>
            </tr>
        )
    }

    render() {
        const { questionList, fetching } = this.props
        return (
            <Page
                className="questionListPage"
                title="Abstimmungen"
            >
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Row style={{justifyContent: "space-between", flex: 1}}>
                                    <Link to='/question/new'>
                                        <Button><FaPlus /> Neu</Button>
                                    </Link>
                                    <SearchInput onChange={(e) => this.setState({ search: e.currentTarget.value})} />
                                    <ButtonWithTimeout text="Refresh" onClick={() => this.props.getQuestionList()} />
                                </Row>
                            </CardHeader>
                            <CardBody>
                                { fetching && <PageSpinner />}
                                { !fetching && questionList && questionList.length > 0 && this.renderList()}
                                { !fetching && !(questionList && questionList.length > 0) && <Delay wait={500}><Empty /></Delay>}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questionList: state.voting.questionList,
        majorityList: state.voting.majorityList,
        fetching: state.voting.fetching,
        error: state.voting.error,
        success: state.voting.success,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getQuestionList: () => dispatch(VotingActions.getQuestionList()),
        getMajorityList: () => dispatch(VotingActions.getMajorityList()),
        updateExistingQuestion: (question) => dispatch(VotingActions.updateExistingQuestion(question)),
        closeQuestion: (id) => dispatch(VotingActions.closeQuestion(id)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuestionListPage);