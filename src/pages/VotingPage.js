import Page from '../components/Page'
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardBody,
  Row,
  Col,
} from 'reactstrap'
import Delay from '../components/Delay'
import QuestionVotingActive from '../components/voting/QuestionVotingActive'
import QuestionResults from '../components/voting/QuestionResults'
import VotingActions from '../redux/votingRedux';
import Empty from '../components/Empty'
import { getQuestionStatus, open, accepted, rejected, unknown, isUserAllowedToVote } from '../utils/functions'
import VotingForm from '../components/voting/VotingForm';
require('moment/locale/de.js')



class VotingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: -1,
        }
    } 
    componentDidMount() {
        const { id } = this.props.match.params
        this.props.getQuestion(id)
        this.setState({ id })
        if (!this.props.majorityList || this.props.majorityList.length === 0) {
            this.props.getMajorityList();
        }
    }

    refresh() {
        this.props.getQuestion(this.state.id)
    }

    renderQuestion() {
        const { question, voteFetching, fetching, voteSuccess, voteError } = this.props
        if (!question) {
            return <Delay ><Empty /></Delay>
        }
        const status = getQuestionStatus(question)
        switch (status) {
            case unknown: return <Empty />;
            case accepted: return <QuestionResults accepted={true} question={question} showVote={true}/>;
            case rejected: return <QuestionResults accepted={false} question={question} showVote={true}/>;
            case open: {
                if (!isUserAllowedToVote()) {
                    return (
                        <Delay><QuestionVotingActive question={question} fetching={fetching} onReload={() => this.props.getQuestion(this.state.id)}/></Delay>
                    )
                }
                return <VotingForm 
                    question={question}
                    fetching={voteFetching || fetching}
                    success={voteSuccess}
                    error={voteError}
                    onSubmit={(vote) => this.props.postVote(vote, question.questionID)}
                    onReload={() => this.props.getQuestion(this.state.id)}
                />;
            }
            default: return <Empty />;
        }
    }

    render() {
        return (
            <Page
                className="questionListPage"
                title="Abstimmungen"
            >
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                { this.renderQuestion() }
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
        question: state.voting.question,
        majorityList: state.voting.majorityList,
        voteFetching: state.voting.voteFetching,
        voteError: state.voting.voteError,
        voteSuccess: state.voting.voteSuccess,
        fetching: state.voting.fetching
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getQuestion: (id) => dispatch(VotingActions.getQuestion(id)),
        getMajorityList: () => dispatch(VotingActions.getMajorityList()),
        postVote: (vote, questionID) => dispatch(VotingActions.postVote(vote, questionID)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(VotingPage);