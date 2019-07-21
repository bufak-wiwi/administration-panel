import Page from 'components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  Alert,
} from 'reactstrap'
import {Link} from 'react-router-dom';
import PageSpinner from '../components/PageSpinner';
import {
  MdCheckCircle,
  MdHighlightOff
} from 'react-icons/md';
import { getUserStatusForConference, unapplied, applied, attendee, rejected } from '../utils/functions'

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  renderUserStatusCard() {
    const { userForConference, conferenceId } = this.props
    console.log('Render UserStatus for id' ,conferenceId)
    switch(getUserStatusForConference(userForConference, conferenceId)) {
      case unapplied:
        return this.renderUnAppliedcard();
      case applied:
        return this.renderAppliedCard();
      case attendee:
        return this.renderAttendeeCard();
      case rejected:
        return this.renderRejectCard();
      default:
        return <PageSpinner color="primary" />
    }
  }

  renderUnAppliedcard() {
    const { conference } = this.props
    return (
      <Card>
        <CardHeader>Du hast dich nicht angemeldet</CardHeader>
        <CardBody>
          { (!conference || !conference.conferenceApplicationPhase) && 'Keine Laufende Anmelde Phase.'}
          { conference && conference.conferenceApplicationPhase  && <Alert color="warning">Melde dich jetzt für die {conference ? conference.name : 'BuFaK'} unter dem folgenden Link an: <Link to="/anmeldung">admin.bufak-wiso.de/anmeldung</Link></Alert>}
        </CardBody>
      </Card>
    )
  }

  renderAppliedCard() {
    const { conference } = this.props
    return (
      <Card>
        <CardHeader>Anmeldung erfolgreich eingegangen</CardHeader>
        <CardBody>
          <Alert color="success">
            Deine Anmeldung für die {conference ? conference.name : 'BuFaK'} ist erfolgreich bei uns eingegangen und wird von dem Ausrichter geprüft.
          </Alert>
          Falls deine Anmeldung angenommen wird, wirst du alle weiteren Informationen auch per E-Mail erhalten.
        </CardBody>
      </Card>
    )
  }

  renderAttendeeCard() {
    const { conference } = this.props
    return (
      <Card>
        <CardHeader>Anmeldung angenommen</CardHeader>
        <CardBody>
          <Alert color="success">
            <MdCheckCircle size={30} /> Deine Anmeldung für die {conference ? conference.names : 'BuFaK'} angenommen.
          </Alert>
        </CardBody>
      </Card>
    )
  }

  renderRejectCard() {
    const { conference } = this.props
    return (
      <Card>
        <CardHeader>Anmeldung abgelehnt</CardHeader>
        <CardBody>
          <Alert color="danger">
            <MdHighlightOff size={30} /> Deine Anmeldung für die {conference ? conference.names : 'BuFaK'} wurde leider abgelehnt.
          </Alert>
          Bitte beachte, dass du weiterhin auf der Warteliste stehst und über einen Nachrückerplatz trotzdem an der BuFaK teilnehmen könntest.
        </CardBody>
      </Card>
    )
  }

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
        className="DashboardPage"
        title={conference ? 'BuFaK ' + conference.name : 'Startseite'}
      >
        { this.renderUserStatusCard()}
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
