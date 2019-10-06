import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkshopActions from '../../redux/workshopRedux'
import { getWorkshopApplicationStatus, applied, unapplied, phaseClosed, noAttendee} from '../../utils/functions'
import { Card, CardHeader, Alert, CardBody, Button } from 'reactstrap'
import { MdCheckCircle, MdWatchLater, MdAlarm } from 'react-icons/md';
import { Redirect } from 'react-router-dom';

class WorkshopApplicationCard extends Component {
  state = {
    waiting: true,
    buttonClicked: false,
  };


  componentDidMount() {
      this.props.getWorkshopApplication(this.props.user.uid)
  }

  renderAppliedCard() {
      return (
          <Card>
              <CardHeader>Workshop Anmeldung</CardHeader>
              <CardBody>
                  <Alert color="success">
                      <MdCheckCircle size={30}/> Deine Anmeldung wurde erfolgreich hochgeladen.
                  </Alert>
              </CardBody>
          </Card>
      )
  }

  renderPhaseClosedCard() {
    return (
        <Card>
            <CardHeader>Workshop Anmeldung</CardHeader>
            <CardBody>
                <Alert color="danger">
                    <MdWatchLater size={30}/> Keine laufende Workshop Anmeldung.
                </Alert>
            </CardBody>
        </Card>
    )
  }

  renderUnappliedCard() {
    return (
        <Card>
            <CardHeader >Workshop Anmeldung</CardHeader>
            <CardBody>
                <Alert color="info">
                    <MdAlarm size={30}/> Du hast dich noch nicht für deine Workshops angemeldet.
                </Alert>
                <Button onClick={() => this.setState({ buttonClicked: true })}>Jetzt anmelden</Button>
            </CardBody> 
            { this.state.buttonClicked && <Redirect to="/workshop" />}
        </Card>
    )
}

  render() {
    const {
        show = true,
        workshopApplication,
        conference,
        userForConference,
        conferenceId
    } = this.props

    if (!show || !conference) {
        return null
    }

    const status = getWorkshopApplicationStatus(workshopApplication, conference.workshopApplicationPhase, userForConference, conferenceId);

    switch(status) {
        case noAttendee: return this.renderPhaseClosedCard();
        case applied: return this.renderAppliedCard();
        case unapplied: return this.renderUnappliedCard();
        case phaseClosed: return this.renderPhaseClosedCard()
        default: return null;
    }
  }
}

const mapStateToProps = (state) => {
    return {
        workshopApplication: state.workshop.workshopApplication,
        conference: state.conference.conference,
        user: state.auth.user,
        conferenceId: state.conference.conferenceId,
        userForConference: state.auth.userForConference,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getWorkshopApplication: (uid) => dispatch(WorkshopActions.getWorkshopApplication(uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopApplicationCard)