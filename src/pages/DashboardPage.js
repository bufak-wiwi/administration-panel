import Page from 'components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap'
import {Link} from 'react-router-dom';
// import { getColor } from 'utils/colors';

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
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
        title={'BuFaK ' + conference.conferenceID || 'Startseite'}
      >
        <Card>
          <CardHeader>Anmeldung</CardHeader>
          <CardBody>
            { conference.conferenceApplicationPhase ? <Link to="/anmeldung">Hier gehts zur Anmeldung</Link> : 'Die Anmeldung ist momentan nicht geöffnet'}
          </CardBody>
        </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
