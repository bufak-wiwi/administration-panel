import Page from '../../components/Page';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Delay from '../../components/Delay';
import QuestionResultsAdmin from '../../components/voting/QuestionResultsAdmin';
import VotingActions from '../../redux/votingRedux';
import Empty from '../../components/Empty';
import { Pie } from 'react-chartjs-2';
import {
  getQuestionStatus,
  open,
  accepted,
  rejected,
  unknown,
} from '../../utils/functions';
require('moment/locale/de.js');

class QuestionResultPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: -1,
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getQuestion(id);
    this.setState({ id });
    if (!this.props.majorityList || this.props.majorityList.length === 0) {
      this.props.getMajorityList();
    }
    this.interval = setInterval(() => this.refresh(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  refresh() {
    this.props.getQuestion(this.state.id);
  }

  renderQuestion() {
    const { question } = this.props;
    if (!question) {
      return (
        <Delay>
          <Empty />
        </Delay>
      );
    }
    const status = getQuestionStatus(question);
    switch (status) {
      case unknown:
        return <Empty />;
      case accepted:
        return (
          <QuestionResultsAdmin
            accepted={true}
            question={question}
            showVote={true}
          />
        );
      case rejected:
        return (
          <QuestionResultsAdmin
            accepted={false}
            question={question}
            showVote={true}
          />
        );
      case open: {
        const data = {
          datasets: [
            {
              data: [question.totalVotes/question.arrivedCouncilCount, (1-question.totalVotes/question.arrivedCouncilCount)],
              backgroundColor: ['rgba(8,165,210,0.6)', 'rgba(200,200,200,0.6)'],
            },
          ],
        };
        const options = {
          legend: {
            display: false,
          },
          maintainAspectRatio: false,
        };
        return (
          <div>
            Abstimmung: {question.questionText}
            {question.isSecret ? ' (geheime Wahl)' : ''}
            <br />
            <strong>{`${question.totalVotes} von ${question.arrivedCouncilCount} Fachschaften haben abgestimmt. `}</strong>
            <br />
            <div style={{ width: '100%', minHeight: 300 }}>
              <Pie data={data} options={options} />
              {/* {isMobile ? (
                <Bar data={data} options={options} />
              ) : (
                <HorizontalBar data={data} options={options} />
              )} */}
            </div>
            <br />
            <br />
          </div>
        );
      }
      default:
        return <Empty />;
    }
  }

  render() {
    return (
      <Page className="questionResultPage" title="Abstimmungsergebnis">
        <Row>
          <Col>
            <Card>
              <CardBody>
                {this.renderQuestion()}
                <Link to={`/questionresult/`}>
                  <Button>Zurück zur Übersicht</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    question: state.voting.question,
    majorityList: state.voting.majorityList,
    voteFetching: state.voting.voteFetching,
    voteError: state.voting.voteError,
    voteSuccess: state.voting.voteSuccess,
    fetching: state.voting.fetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestion: id => dispatch(VotingActions.getQuestion(id)),
    getMajorityList: () => dispatch(VotingActions.getMajorityList()),
    postVote: (vote, questionID) =>
      dispatch(VotingActions.postVote(vote, questionID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionResultPage);
