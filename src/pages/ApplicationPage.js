import Page from 'components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap'
// import { getColor } from 'utils/colors';

class ApplicationPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  renderNoApplicationPhase = () => {
      return (
        <Card>
            <CardHeader>Keine Laufende Anmeldephase</CardHeader>
            <CardBody>
                Für die ausgewählte BuFaK gibt es keine laufende Anmeldephase.
            </CardBody>
        </Card>
      )
  }

  renderApplicationForm = () => {
    return (
        <Card>
            <CardHeader>jioj</CardHeader>
            <CardBody>
                gfd
            </CardBody>
        </Card>
      )
  }

  render() {
    const {conferenceList, conferenceId} = this.props;

    if (!conferenceList) {
      return ('loading');
    }
    const conference = conferenceList.find(x => x.conferenceID === conferenceId);

    return (
      <Page
        className="DashboardPage"
        title="Anmeldung"
      >
        { !conference.applicationPhase && this.renderNoApplicationPhase()}
        { conference.applicationPhase && this.renderApplicationForm()}
     </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conferenceId: state.conference.conferenceId,
    conferenceList: state.conference.conferenceList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage);
