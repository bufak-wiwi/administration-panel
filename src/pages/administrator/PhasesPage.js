import Page from '../../components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  Alert,
} from 'reactstrap'
import {Link} from 'react-router-dom';
import PageSpinner from '../../components/PageSpinner';
import {
  MdCheckCircle,
  MdHighlightOff
} from 'react-icons/md';

class DashboardPage extends React.Component {


  render() {
    const {conferenceList, conferenceId} = this.props;

    if (!conferenceList) {
      return (
        <PageSpinner color="primary" />
      );
    }
    const conference = conferenceList.find(x => x.conferenceID === conferenceId);

    return (
      <Page
        className="PhasesPage"
        title="Phasen-Einstellung"
      >
          title
     </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conferenceId: state.conference.conferenceId,
    conferenceList: state.conference.conferenceList,
    userForConference: state.auth.userForConference
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
