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
import { CSVLink } from "react-csv";
import Delay from '../../components/Delay';
import { FaDownload } from 'react-icons/fa';

const phases = [
    { name: 'Workshopvorschlag einreichen', id: 'workshopSuggestionPhase'},
    { name: 'Anmeldung zur Konferenz', id:'conferenceApplicationPhase'},
    { name: 'Workshop-Anmeldung', id: 'workshopApplicationPhase'}
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
        }
    }

    componentDidMount() {
        this.props.getPasswordList();
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
        const { conferenceApplicationPhase, workshopApplicationPhase, workshopSuggestionPhase } = this.props.conference
        this.setState({
            conferenceApplicationPhase,
            workshopApplicationPhase,
            workshopSuggestionPhase,
        })
    }

    onSavePress() {
        this.setState({
            editing: false
        })
        const { 
            conferenceApplicationPhase,
            workshopApplicationPhase,
            workshopSuggestionPhase
        } = this.state;
        this.props.updatePhases({
            conferenceApplicationPhase,
            workshopApplicationPhase,
            workshopSuggestionPhase
        })
    }

    getCouncilPasswords(passwordList){
        var result = [["Passwort", "Priorität", "Fachschafts-ID", "Name", "Stadt", "Hochschule", "Bundesland", "Adresse", "E-Mail-Adresse", "Passwort-ID"]]
        passwordList.forEach(row => {
            if (row.council) {
                result.push([
                    row.password,
                    row.priority,
                    row.council.councilID,
                    row.council.name,
                    row.council.city,
                    row.council.university,
                    row.council.state,
                    row.council.address,
                    row.council.contactEmail,
                    row.id,
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

  render() {
    const { conference, passwordList } = this.props
    if (!conference) {
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
            <Col xs="12">
                <Card>
                    <CardHeader>
                        <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
                            Anmeldephasen
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

                    </CardBody>
                </Card>
                <Card style={{marginTop: 10}}>
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
                                                <Button>
                                                    <FaDownload /> Fachschafts Passwörter
                                                </Button>
                                            </CSVLink>
                                            <CSVLink 
                                                data={this.getOtherPasswords(passwordList)}
                                                filename={"WeiterePasswörter.csv"}
                                                style={{marginRight: 10}}
                                            >
                                                <Button>
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
                                            <Button onClick={() => this.props.generateAuthenticationKeys(this.state.otherKeys)}></Button>
                                        </Col>
                                    </Row>
                                </div>                            
                            }
                        </Delay>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePhases: (data) => dispatch(ConferenceActions.updatePhases(data)),
    generateAuthenticationKeys: (otherKeysCount) => dispatch(ConferenceActions.generateAuthenticationKeys(otherKeysCount)),
    getPasswordList: () => dispatch(ConferenceActions.getPasswordList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
