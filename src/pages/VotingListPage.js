import Page from '../components/Page'
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Alert
} from 'reactstrap'
import Delay from '../components/Delay'
import VotingActions from '../redux/votingRedux';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Empty from '../components/Empty'
import ButtonWithTimeout from '../components/voting/ButtonWithTimeout'
import { getQuestionStatus, getQuestionStatusText, open, isUserAllowedToVote, getQuestionStatusColor } from '../utils/functions'
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { MdExpandMore } from 'react-icons/md';
import PageSpinner from '../components/PageSpinner';
require('moment/locale/de.js')



class VotingListPage extends React.Component {

    componentDidMount() {
        this.props.getOpenQuestionList();
        if (!this.props.majorityList || this.props.majorityList.length === 0) {
            this.props.getMajorityList();
        }
    }

    refresh() {
        this.props.getOpenQuestionList(); 
    }

    renderList() {
        const openList = this.props.openQuestionList.filter(x =>  getQuestionStatus(x) === open)
        const closedList = this.props.openQuestionList.filter(x =>  getQuestionStatus(x) !== open)
        return (
            <div>
                {openList.map(question => this.renderOpenQuestionCard(question)) }
                <Accordion>
                    <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        Geschlossene Abstimmungen
                    </AccordionSummary>
                    <AccordionDetails style={{flex: 1}}>
                        <div style={{flex: 1}}>
                            {
                            [...closedList]
                                .sort((a,b) => moment(a.resolvedOn).isBefore(b.resolvedOn) ? 1 : -1)
                                .map(question => this.renderQuestionCard(question)) 
                            }</div>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }

    renderOpenQuestionCard(question) {
        const statusText = getQuestionStatusText(question)
        const statusColor = getQuestionStatusColor(question)
        return (
            <Card key={question.questionID} style={{ marginBottom: 10 }}>
                <Alert color={statusColor}>{statusText.toUpperCase()}: {question.questionText} </Alert>
                <Col>
                    <Link to={`/abstimmung/${question.questionID}`}>
                        <Button block>{ isUserAllowedToVote() ? "zur Abstimmung" : "Details anzeigen"}</Button>
                    </Link>
                </Col>
            </Card>
        )
    }

    renderQuestionCard(question) {
        const statusText = getQuestionStatusText(question)
        const statusColor = getQuestionStatusColor(question)
        return (
            <Row key={question.questionID}>
                <Card style={{ marginBottom: 10, flex: 1 }}>
                    <Alert color={statusColor}>{statusText.toUpperCase()}: {question.questionText} </Alert>
                    <Col>
                        <Link to={`/abstimmung/${question.questionID}`}>
                            <Button block>Details anzeigen</Button>
                        </Link>
                    </Col>
                </Card>
            </Row>
        )
    }

    render() {
        const { openQuestionList, majorityList, fetching } = this.props
        if (!majorityList) {
            return <PageSpinner />
        }
        return (
            <Page
                className="questionListPage"
                title="Abstimmungen"
            >
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Row style={{ justifyContent: 'space-between', marginLeft: 5}}>
                                    Übersicht der Abstimmungen
                                    <ButtonWithTimeout text="Refresh" onClick={() => this.refresh()} timeout={5000}/>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                { fetching && <PageSpinner />}
                                { !fetching && openQuestionList && openQuestionList.length > 0 && this.renderList()}
                                { !fetching && !(openQuestionList && openQuestionList.length > 0) && <Delay wait={500}><Empty /></Delay>}
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
        openQuestionList: state.voting.openQuestionList,
        majorityList: state.voting.majorityList,
        fetching: state.voting.fetching
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getOpenQuestionList: () => dispatch(VotingActions.getOpenQuestionList()),
        getMajorityList: () => dispatch(VotingActions.getMajorityList()),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(VotingListPage);