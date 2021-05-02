import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkshopActions from '../../redux/workshopRedux'
import { getWorkshopApplicationStatus, applied, unapplied, phaseClosed, noAttendee, attendee, toGermanTime, isMobileDevice} from '../../utils/functions'
import { Card, CardHeader, Alert, CardBody, Button, Table, Row, Col} from 'reactstrap'
import { MdCheckCircle, MdWatchLater, MdAlarm } from 'react-icons/md';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
require('moment/locale/de.js')
const ical = require('ical-generator');

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
              <CardHeader>Workshopanmeldung</CardHeader>
              <CardBody>
                  <Alert color="success">
                      <MdCheckCircle size={30}/> Deine Anmeldung wurde erfolgreich abgeschickt.
                  </Alert>
              </CardBody>
          </Card>
      )
  }

  createICal(workshopApplication) {
    return ical({
        domain: 'bufak-wiwi.org',
        prodId: {company: 'bufak-wiwi', product: this.props.conference.name, language: 'DE'},
        events:  this.getSortedWorkshops(workshopApplication).map(x => ({
            start: moment(x.workshop.start),
            end: moment(x.workshop.start).add(x.workshop.duration, 'minutes'),
            timestamp: moment(x.workshop.start),
            summary: x.workshop.name,
            description: x.workshop.overview,
            location: x.workshop.place || 'tba' , 
            organizer: x.workshop.hostName + ' <rat@bufak-wiwi.org>'
        }))
    }).toURL();
  }

  getSortedWorkshops(workshopApplication) {
    return [...workshopApplication]
        .sort((x,y) => x.workshop.start > y.workshop.start ? 1 : -1)
        .filter(x => x.status === "IsAttendee")
        .filter(x => x.workshop && x.workshop.conferenceID === this.props.conferenceId)
  }

  renderAttendeeCard(workshopApplication) {
    return (
        <div>
            <CardHeader>
                <Col>
                    <Row style={{justifyContent: 'space-between'}}>
                        <div>Workshopübersicht</div>             
                        <a href={this.createICal(workshopApplication)}><Button>Kalender exportieren</Button></a>
                    </Row>
                </Col>
            </CardHeader>
            <Table size={isMobileDevice() ? "sm" : ""} responsive borderd="true" style={{backgroundColor: 'white'}}>
                <thead><tr>
                    <th>Zeitpunkt</th>
                    <th>Workshop</th>
                    <th>Raum</th>
                    <th>Leiter</th>
                </tr></thead>
                <tbody>
                    { this.getSortedWorkshops(workshopApplication).map(x => 
                        <tr key={x.workshop.workshopID} >
                            <td>{toGermanTime(x.workshop.start)}</td>
                            <td>{x.workshop.name}</td>
                            <td>{x.workshop.place || 'tba'}</td>
                            <td>{x.workshop.hostName}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
  }

  renderPhaseClosedCard() {
    return (
        <Card>
            <CardHeader>Workshopanmeldung</CardHeader>
            <CardBody>
                <Alert color="danger">
                    <MdWatchLater size={30}/> Keine laufende Workshopanmeldung.
                </Alert>
            </CardBody>
        </Card>
    )
  }

  renderUnappliedCard() {
    return (
        <Card>
            <CardHeader >Workshopanmeldung</CardHeader>
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
        case attendee: return this.renderAttendeeCard(workshopApplication);
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
