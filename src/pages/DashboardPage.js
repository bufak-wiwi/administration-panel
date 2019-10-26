import Page from 'components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  Alert,
  Row,
  Col,
} from 'reactstrap'
import {Link} from 'react-router-dom';
import PageSpinner from '../components/PageSpinner';
import {
  MdCheckCircle,
  MdHighlightOff
} from 'react-icons/md';
import { getUserStatusForConference, unapplied, applied, attendee, rejected, currentlyBufak } from '../utils/functions'
import ConferenceActions from '../redux/conferenceRedux'
import WorkshopApplicationCard from '../components/Widget/WorkshopApplicationCard';
import UploadInformationCard from '../components/Widget/UploadInformationCard';

class DashboardPage extends React.Component {
  componentDidMount() {
    this.props.getConference();
  }

  renderUserStatusCard() {
    const { userForConference, conferenceId } = this.props
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
          { conference && conference.conferenceApplicationPhase  && <Alert color="warning">Melde dich jetzt für die {conference ? conference.name : 'BuFaK'} unter dem folgenden Link an: <Link to="/anmeldung">konferenz.bufak-wiso.de/anmeldung</Link></Alert>}
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
            <MdCheckCircle size={30} /> Deine Anmeldung für die {conference ? conference.name : 'BuFaK'} wurde angenommen.
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
          Bitte beachte, dass du weiterhin auf der Warteliste stehst und über einen Nachrückerplatz trotzdem an der BuFaK teilnehmen kannst.
        </CardBody>
      </Card>
    )
  }

  render() {
    const {conference} = this.props;
    if (!conference) {
      return (
        <PageSpinner color="primary" />
      );
    }
    return (
      <Page
        className="DashboardPage"
        title={conference ? conference.name : 'Startseite'}
      >
        { currentlyBufak(conference) && 
          <Row>
            <Col md="12" xs="12"><WorkshopApplicationCard show={true} /></Col>
          </Row>
        }
        <Row>
          <Col md="12" xs="12">
            <UploadInformationCard show={true}/>
          </Col>
        </Row>
        { !currentlyBufak(conference) && 
          <Row>
            <Col md="6" xs="12">{this.renderUserStatusCard()}</Col>
            <Col md="6" xs="12"><WorkshopApplicationCard show={true} /></Col>
          </Row>
        }
     </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conference: state.conference.conference,
    conferenceId: state.conference.conferenceId,
    userForConference: state.auth.userForConference
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getConference: () => dispatch(ConferenceActions.getConference())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
