import Page from '../../components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Alert,
  Button,
} from 'reactstrap'
import PageSpinner from '../../components/PageSpinner';
import ConferenceActions from '../../redux/conferenceRedux';
import CouncilActions from '../../redux/councilRedux';
import WorkshopActions from '../../redux/workshopRedux';
import { CSVLink } from "react-csv";
import Delay from '../../components/Delay';
import Tabs from "../../components/Tabs";
import { FaDownload } from 'react-icons/fa';
import { getPriorityOrType, getStatus, getType} from '../../utils/functions'

const phases = [
    { name: 'Workshopvorschlag einreichen', id: 'workshopSuggestionPhase'},
    { name: 'Anmeldung zur Konferenz', id:'conferenceApplicationPhase'},
    { name: 'Workshop-Anmeldung', id: 'workshopApplicationPhase'}
]

const infoTexts = [
    { name: 'Infotext Anmeldung', id: 'informationTextConferenceApplication'},
    { name: 'Infotext Workshops', id:'informationTextWorkshopSuggestion'}
]

const links = [
    { name: 'Teilnahmebedingungen', id: 'linkParticipantAgreement'}
]

const workshop = [
    { name: 'Dauer', id: 'workshopDurations'},
    { name: 'Themenbereiche', id: 'workshopTopics'}
]

const travel = [
    { name: 'Anreiseorte', id: 'travelArrivalPlaces'},
    { name: 'Transportmittel', id: 'travelTransportation'}
]
class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            editing: false,
            conferenceApplicationPhase: false,
            workshopApplicationPhase: false,
            workshopSuggestionPhase: false,
            otherKeys: 50,
            informationTextConferenceApplication: "Beispieltext",
            informationTextWorkshopSuggestion: "Beispieltext",
            linkParticipantAgreement: "Link zum ...",
            workshopDurations: "45,90,120",
            workshopTopics :"Fachschaftsarbeit,Gremien,Rat",
            travelArrivalPlaces :"HBF,ZOB,Uni Parkplatz",
            travelTransportation :"Auto,Zug,Flugzeug"
        }
    }

    componentDidMount() {
        this.props.getPasswordList();
        this.props.getApplicationList();
        this.props.getCouncilList();
        this.props.getWorkshopList();
        this.props.getBadgeList();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.conference !== this.props.conference) {
            this.savePropsToState()
        }
    }

    onCancelPress() {
        this.setState({
            editing: false
        })
        this.savePropsToState()
    }

    savePropsToState() {
        const { conferenceApplicationPhase, workshopApplicationPhase, workshopSuggestionPhase,informationTextConferenceApplication,informationTextWorkshopSuggestion,linkParticipantAgreement,workshopDurations,workshopTopics,travelArrivalPlaces,travelTransportation } = this.props.conference
        this.setState({
            conferenceApplicationPhase,
            workshopApplicationPhase,
            workshopSuggestionPhase,
            informationTextConferenceApplication,
            informationTextWorkshopSuggestion,
            linkParticipantAgreement,
            workshopDurations,
            workshopTopics,
            travelArrivalPlaces,
            travelTransportation
        })
    }

    onSavePress() {
        this.setState({
            editing: false
        })
        const { 
            conferenceApplicationPhase,
            workshopApplicationPhase,
            workshopSuggestionPhase,
            informationTextConferenceApplication,
            informationTextWorkshopSuggestion,
            linkParticipantAgreement,
            workshopDurations,
            workshopTopics,
            travelArrivalPlaces,
            travelTransportation
        } = this.state;
        this.props.updatePhases({
            conferenceApplicationPhase,
            workshopApplicationPhase,
            workshopSuggestionPhase,
            informationTextConferenceApplication,
            informationTextWorkshopSuggestion,
            linkParticipantAgreement,
            workshopDurations,
            workshopTopics,
            travelArrivalPlaces,
            travelTransportation
        })
    }

    getCouncilPasswords(passwordList){
        var result = [["Fachschafts-ID", "Name", "Stadt", "PLZ", "Hochschule", "Bundesland", "Adresse", "E-Mail-Adresse", "Prio 1", "Prio 2", "Prio 3", "Prio 4", "Prio 5", "Prio 6"]]
        var councils = {}
        passwordList.filter(x => x.council != null).forEach(row => {
            const councilID = row.council.councilID
            if (councils[councilID]) {
                councils[councilID].push(row)
            } else {
                councils[councilID] = [row]
            }
        })

        Object.values(councils).forEach(council => {
            council = council.sort((a, b) => a.prio < b.prio ? -1 : 1)
            if (council.length > 5) {
                result.push([
                    council[0].council.councilID,
                    council[0].council.name,
                    council[0].council.city.split(';')[0],
                    council[0].council.city.split(';')[1],
                    council[0].council.university,
                    council[0].council.state,
                    council[0].council.address,
                    council[0].council.contactEmail,
                    council[0].password,
                    council[1].password,
                    council[2].password,
                    council[3].password,
                    council[4].password,
                    council[5].password,
                ])
            }
        })
        return result
    }

    getOtherPasswords(passwordList){
        var result = [["Passwort", "Passwort-ID"]]
        passwordList.forEach(row => {
            if (!row.council) {
                result.push([
                    row.password,
                    row.id,
                ])
            } 
        })
        return result
    }

    getApplications(applicationList) {
        var result = [["Zeitpunkt", "Status", "Priorität", "Vorname", "Nachname", "Geschlecht", "Geburtstag", "E-Mail-Adresse", "Telefon", "Essen", "Unverträglichkeiten", "Anmerkung", "Schlafpräferenz", "#BuFaK","Fachschaft", "Universität", "Hotel", "Zimmer"]]
        applicationList.forEach(x => {
            result.push([
                x.timestamp,
                getStatus(x),
                getPriorityOrType(x),
                x.user.name,
                x.user.surname,
                x.user.sex,
                x.user.birthday,
                x.user.email,
                x.sensible.telephone || "",
                x.sensible.eatingPreferences,
                x.sensible.intolerances,
                x.sensible.extraNote,
                x.sensible.sleepingPreferences,
                x.sensible.buFaKCount
                this.getCouncilName(x.user.councilID),
                this.getCouncilUniversity(x.user.councilID),
                x.hotel,
                x.room
            ])
        })
        return result
    }

    getWorkshops(workshopList) {
        var result = [["Uhrzeit", "Name", "Workshopleiter", "Raum", "Beschreibung","Topic", "Anmerkung", "max. Teilnehmer", "Teilnehmer", "WorkshopID"]]
        workshopList.forEach(x => {
            result.push([
                x.start,
                x.name,
                x.hostName,
                x.place,
                x.overview,
                x.topic,
                x.materialNote,
                x.maxVisitors,
                x.applicants,
                x.workshopID
            ])
        })
        return result
    }

    getBadges(badgeList) {
        if (badgeList.length === 0) {
            return []
        }

        var workshops = []
        for(var i = 1; i <= badgeList[0].workshops.length; i++) {
            workshops.push(`WS_${i}`)
            workshops.push(`Raum_WS_${i}`)
        }

        var result = [["Name", "Nachname", "Fachschaft", "Universität", "Status", "FachschaftsID", "userID", ...workshops]]
        badgeList = badgeList.filter(x => x.workshop && x.workshop.conferenceID === this.props.conferenceId)
        badgeList.forEach(x => {
            result.push([
                x.name,
                x.surname,
                x.councilName,
                x.university,
                getType(x),
                x.councilID,
                x.uid,
                ...x.workshops.map(x => [x.name, x.place]).flat(1)
            ])
        })
        return result;
    }

    getCouncilName(councilId) {
        const council = this.props.councilList.find(x => x.councilID === councilId)
        return council ? council.name : councilId
    }

    getCouncilUniversity(councilId) {
        const council = this.props.councilList.find(x => x.councilID === councilId)
        return council ? council.university : 'unbekannt'
    }
  render() {
    const { conference, passwordList, applicationList, councilList, workshopList, badgeList } = this.props
    if (!conference || !applicationList || !councilList || !workshopList || !badgeList) {
      return (
        <PageSpinner color="primary" />
      );
    }

    return (
      <Page
        className="PhasesPage"
        title="Konferenz-Einstellungen"
      >
        <Row>
            <Col xs="12" md="6">
                <Card>
                    <CardHeader>
                        <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
                            Einstellungen
                            <div>
                            { !this.state.editing && <Button onClick={() => this.setState({ editing: true})}>Bearbeiten</Button>}
                            { this.state.editing && <Button onClick={() => this.onCancelPress()}>Abbrechen</Button>}
                            { this.state.editing && <Button style={{marginLeft: 10}} onClick={() => this.onSavePress()}>Speichern</Button>}
                            </div>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        { phases.map(x => {
                            return (
                                <FormGroup key={'formGroup_' + x.id}>
                                    <Label for={x.id}>{x.name}</Label>
                                    <Input 
                                        type="select"
                                        id={x.id}
                                        key={x.id}
                                        disabled={!this.state.editing}
                                        value={this.state[x.id] ? '1' : '0'}
                                        onChange={(e) => this.setState({ [x.id]: e.currentTarget.value === '0' ? false : true})}
                                    >
                                        <option value="0">geschlossen</option>
                                        <option value="1">offen</option>
                                    </Input>
                                </FormGroup>
                            )
                        })}

                        <div>
                            <Tabs>
                                <div label="Info Texte">
                                    { infoTexts.map(x => {
                                        return (
                                            <FormGroup key={'formGroup_' + x.id}>
                                                <Label for={x.id}>{x.name}</Label>
                                                <Input 
                                                    type="textarea"
                                                    id={x.id}
                                                    key={x.id}
                                                    disabled={!this.state.editing}
                                                    value={this.state[x.id]}
                                                    onChange={(e) => this.setState({ [x.id]: e.currentTarget.value})}
                                                >
                                                </Input>
                                            </FormGroup>
                                        )
                                    })} 
                                </div>
                                <div label="Workshops">
                                    { workshop.map(x => {
                                            return (
                                                <FormGroup key={'formGroup_' + x.id}>
                                                    <Label for={x.id}>{x.name}</Label>
                                                    <Input 
                                                        type="text"
                                                        id={x.id}
                                                        key={x.id}
                                                        disabled={!this.state.editing}
                                                        value={this.state[x.id]}
                                                        onChange={(e) => this.setState({ [x.id]: e.currentTarget.value})}
                                                    >
                                                    </Input>
                                                </FormGroup>
                                            )
                                        })}
                                </div>
                                <div label="An und Abreise">
                                    { travel.map(x => {
                                            return (
                                                <FormGroup key={'formGroup_' + x.id}>
                                                    <Label for={x.id}>{x.name}</Label>
                                                    <Input 
                                                        type="text"
                                                        id={x.id}
                                                        key={x.id}
                                                        disabled={!this.state.editing}
                                                        value={this.state[x.id]}
                                                        onChange={(e) => this.setState({ [x.id]: e.currentTarget.value})}
                                                    >
                                                    </Input>
                                                </FormGroup>
                                            )
                                        })}
                                </div>
                                <div label="Links">
                                    { links.map(x => {
                                        return (
                                            <FormGroup key={'formGroup_' + x.id}>
                                                <Label for={x.id}>{x.name}</Label>
                                                <Input 
                                                    type="text"
                                                    id={x.id}
                                                    key={x.id}
                                                    disabled={!this.state.editing}
                                                    value={this.state[x.id]}
                                                    onChange={(e) => this.setState({ [x.id]: e.currentTarget.value})}
                                                >
                                                </Input>
                                            </FormGroup>
                                        )
                                    })}
                                </div>
                            </Tabs>
                            </div>
                        


                    </CardBody>
                </Card>
            </Col>
            <Col xs="12" md="6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Anmeldecodes
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Delay >
                            { passwordList.length > 0 ?
                                <div>
                                    <Alert color="success">Hier könnt ihr euch die generierten Anmeldecodes herunterladen. Solltet ihr nicht genug erstellt haben, meldet euch bitte bei den Administratoren.<br />
                                    <b>Anleitung:</b><br />
                                    <ol>
                                        <li>Excel öffnen</li>
                                        <li>Reiter <i>Daten</i> anwählen</li>
                                        <li><i>Aus Text/CSV</i> auswählen</li>
                                        <li>Passwortliste auswählen und importieren</li>
                                        <li><i>Komma</i> als Trennzeichen wählen und Daten <i>Laden</i></li>
                                    </ol>
                                    </Alert>
                                    <Row>
                                        <Col>
                                            <CSVLink 
                                                data={this.getCouncilPasswords(passwordList)}
                                                filename={"FachschaftsPasswörter.csv"}
                                                style={{marginRight: 10}}
                                            >
                                                <Button block>
                                                    <FaDownload /> Fachschaftspasswörter
                                                </Button>
                                            </CSVLink>
                                            </Col><Col>
                                            <CSVLink 
                                                data={this.getOtherPasswords(passwordList)}
                                                filename={"WeiterePasswörter.csv"}
                                                style={{marginRight: 10}}
                                            >
                                                <Button block>
                                                    <FaDownload /> Weitere Passwörter
                                                </Button>
                                            </CSVLink>
                                        </Col>
                                    </Row>
                                </div>
                                :
                                <div>
                                    <Alert color="info">Hier könnt ihr eure Anmeldecodes erstellen. Jede Fachschaft bekommt automatisch 6 Anmeldecodes, welche von 1-6 priorisiert sind.<br/>
                                    Alumni, Rat und mögliche Helfer melden sich über weitere Codes an. Ihr müsst dafür angeben, wieviele weitere Codes ihr benötigt.<br /><b>Da die Codes nur einmal erstellt werden können, gebt besser ein paar Codes mehr an als nötig.</b></Alert>
                                    <Row>
                                        <Col xs={12} md={2}>
                                            <Input 
                                                type="number"
                                                value={this.state.otherKeys}
                                                onChange={(e) => this.setState({ otherKeys: e.currentTarget.value})}
                                            />
                                        </Col>
                                        <Col>
                                            <Button onClick={() => this.props.generateAuthenticationKeys(this.state.otherKeys)}>Passwörter erzeugen</Button>
                                        </Col>
                                    </Row>
                                </div>                            
                            }
                        </Delay>
                    </CardBody>
                </Card>
                <Card style={{marginTop: 10}}>
                    <CardHeader>
                        <CardTitle>
                            Export
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Alert color="success">Ladet hier alle eure Anmeldungen, eure aktuellen Workshops oder die Daten für die Teilnehmerbadges als CSV herunter.</Alert>
                        <Row>
                            <Col>
                                <CSVLink 
                                    data={this.getApplications(applicationList)}
                                    separator=";"
                                    filename={"Anmeldungen.csv"}
                                    style={{marginRight: 10}}
                                >
                                    <Button block>
                                        <FaDownload /> Anmeldungen
                                    </Button>
                                </CSVLink>
                            </Col>
                            <Col>
                                <CSVLink 
                                    data={this.getWorkshops(workshopList)}
                                    separator=";"
                                    filename={"Workshops.csv"}
                                    style={{marginRight: 10}}
                                >
                                    <Button block>
                                        <FaDownload /> Workshopliste
                                    </Button>
                                </CSVLink>
                            </Col>
                            <Col>
                                <CSVLink 
                                    data={this.getBadges(badgeList)}
                                    filename={"badges.csv"}
                                    style={{marginRight: 10}}
                                >
                                    <Button block>
                                        <FaDownload /> Teilnehmerbadges
                                    </Button>
                                </CSVLink>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
     </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conference: state.conference.conference,
    passwordList: state.conference.passwordList,
    applicationList: state.conference.applicationList,
    councilList: state.council.councilList,
    workshopList: state.workshop.workshopList,
    badgeList: state.conference.badgeList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePhases: (data) => dispatch(ConferenceActions.updatePhases(data)),
    generateAuthenticationKeys: (otherKeysCount) => dispatch(ConferenceActions.generateAuthenticationKeys(otherKeysCount)),
    getPasswordList: () => dispatch(ConferenceActions.getPasswordList()),
    getApplicationList: () => dispatch(ConferenceActions.getApplicationList()),
    getCouncilList: () => dispatch(CouncilActions.getCouncilList()),
    getWorkshopList: () => dispatch(WorkshopActions.getWorkshopList()),
    getBadgeList: () => dispatch(ConferenceActions.getBadgeList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
