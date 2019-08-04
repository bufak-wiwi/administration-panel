import Page from 'components/Page';
import React from 'react';
import { connect } from 'react-redux'
import ConferenceActions from '../redux/conferenceRedux'
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Row,
  Col,
  FormGroup,
  Form,
  Label,
  Button,
  Alert,
} from 'reactstrap'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PageSpinner from '../components/PageSpinner';
import { isApplied } from '../utils/functions'
import {
  MdCheckCircle,
  MdHighlightOff
} from 'react-icons/md';
import PasswordProtection from '../components/PasswordProtection'
// import { getColor } from 'utils/colors';

class ApplicationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participant: 'pariticipant',
      priority: 1,
      bufakCount: 1,
      activeStep: 0,
      eat: 'carnivorous',
      intolerance: 'no',
      sleep: 'same council',
      phone: '',
      intolerance_note: '',
      note: '',
      newsletter: false,
      dataprotection: false,
    }
  }
  
  renderNoApplicationPhase = () => {
      return (
        <Card>
            <CardHeader>Keine Laufende Anmeldephase</CardHeader>
            <CardBody>
                Für die {this.props.conference ? this.props.conference.name : 'ausgewählte BuFaK'} gibt es keine laufende Anmeldephase.
            </CardBody>
        </Card>
      )
  }

  renderApplicationForm = () => {
    if (!this.props.isPasswordValid) {
      return (<PasswordProtection />)
    } 
    return (
        <Card>
            <CardBody>
              <Stepper activeStep={this.state.activeStep} alternativeLabel>
                <Step key={1}>
                  <StepLabel>Allgemeine Informationen</StepLabel>
                </Step>

                <Step key={2}>
                  <StepLabel>Spezifische Informationen</StepLabel>
                </Step>

                <Step key={3}>
                  <StepLabel>Angaben überprüfen</StepLabel>
                </Step>
              </Stepper>
            <Form>
              { this.state.activeStep === 0 && this.renderGeneralStep()}
              { this.state.activeStep === 1 && this.renderSpecificStep()}
              { this.state.activeStep === 2 && this.renderApproveStep()}
              { this.state.activeStep === 3 && this.renderResult()}
            </Form>
            </CardBody>
        </Card>
      )
  }

  renderGeneralStep(){
    return (
      <div>
      <Row>
        <Col xs="12" sm="6">
          <FormGroup>
            <Label for="participant">Ich bin*</Label>
            <Input
              type="select"
              value={this.state.participant}
              onChange={(e) => this.setState({ participant: e.currentTarget.value})}
              required
              id="participant"
            >
              <option value="pariticipant">Teilnehmer</option>
              <option value="alumnus">Alumnus</option>
              <option value="rat">BuFaK Rat</option>
              <option value="helper">Helfer</option>
            </Input>
          </FormGroup>
        </Col>
        <Col xs="12" sm="6">
          <FormGroup>
            <Label for="priority">Welche Priorität hast du in deiner Fachschaft?*</Label>
            <Input
              type="select"
              disabled
              value={this.props.priority}
              //onChange={(e) => this.setState({ priority: e.currentTarget.value})}
              required
              id="priority">
              {Array.from({length: 6}, (v, k) => k+1).map(x => <option key={x} id={x}>{x}</option>)}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="6">
          <FormGroup>
            <Label for="bufakCount">Deine wievielte BuFaK ist das?*</Label>
            <Input
              type="number"
              min={1}
              max={99}
              value={this.state.bufakCount}
              onChange={(e) => this.setState({ bufakCount: e.currentTarget.value})}
              required
              id="bufakCount"/>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col >
          <Button disabled={!this.state.bufakCount} className="float-right" onClick={() => this.setState({activeStep: 1})}>Weiter</Button>
        </Col>
      </Row>
      </div>
    )
  }

  renderSpecificStep() {
    return (
      <div>
        <Alert color="warning" style={{ justifyContent: 'center'}}>Diese sensitiven Informationen werden nach der BuFaK gelöscht.</Alert>
        <Row>
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="sleep">Mit wem möchtest du auf einem Zimmer schlafen?*</Label>
              <Input
                type="select"
                value={this.state.sleep}
                onChange={(e) => this.setState({ sleep: e.currentTarget.value})}
                required
                id="sleep"
              >
                <option value="same council">Eigene Fachschaft</option>
                <option value="same sex">Eigenes Geschlecht</option>
                <option value="no preferences">Egal</option>
              </Input>
            </FormGroup>
          </Col>
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="phone">Wie lautet deine Handynummer?</Label>
              <Input
                type="tel"
                value={this.state.phone}
                onChange={(e) => this.setState({ phone: e.currentTarget.value})}
                required
                id="phone"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="eat">Wie isst du?*</Label>
              <Input
                type="select"
                value={this.state.eat}
                onChange={(e) => this.setState({ eat: e.currentTarget.value})}
                required
                id="eat"
              >
                <option value="carnivorous">Alles</option>
                <option value="vegetarian">Vegetarisch</option>
                <option value="vegan">Vegan</option>

              </Input>
            </FormGroup>
          </Col>
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="intolerance">Hast du Unverträglichkeiten?*</Label>
              <Input
                type="select"
                value={this.state.intolerance}
                onChange={(e) => this.setState({ intolerance: e.currentTarget.value})}
                required
                id="intolerance"
              >
                <option value="no">Nein</option>
                <option value="yes">Ja</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          { this.state.intolerance === 'yes'  && 
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="intolerance_note">Welche Unverträglichkeiten hast du?*</Label>
              <Input
                type="textarea"
                value={this.state.intolerance_note}
                onChange={(e) => this.setState({ intolerance_note: e.currentTarget.value})}
                required
                id="intolerance_note"
              />
            </FormGroup>
          </Col>
        }
        <Col xs="12" sm="6">
            <FormGroup>
              <Label for="note">Hast du Anmerkungen?</Label>
              <Input
                type="textarea"
                value={this.state.note}
                onChange={(e) => this.setState({ note: e.currentTarget.value})}
                required
                id="note"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6" sm="6">
            <Button onClick={() => this.setState({activeStep: 0})}>Zurück</Button>
          </Col>
          <Col xs="6" sm="6" >
            <Button
              className="float-right"
              disabled={this.state.intolerance === 'yes' && this.state.intolerance_note === ''}
              onClick={() => this.setState({activeStep: 2})}
              >
                Weiter
              </Button>
          </Col>
        </Row>
      </div>
    )
  }

  renderApproveStep() {
    return (
      <div>
        <Row>
        <Col xs="12" sm="6">
          <FormGroup>
            <Label for="participant">Ich bin*</Label>
            <Input
              type="select"
              value={this.state.participant}
              disabled
              required
              id="participant"
            >
              <option value="pariticipant">Teilnehmer</option>
              <option value="alumnus">Alumnus</option>
              <option value="rat">BuFaK Rat</option>
              <option value="helper">Helfer</option>
            </Input>
          </FormGroup>
        </Col>
        <Col xs="12" sm="6">
          <FormGroup>
            <Label for="priority">Welche Priorität hast du in deiner Fachschaft?*</Label>
            <Input
              type="select"
              value={this.props.priority}
              disabled
              required
              id="priority">
              {Array.from({length: 6}, (v, k) => k+1).map(x => <option key={x} id={x}>{x}</option>)}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="6">
          <FormGroup>
            <Label for="bufakCount">Deine wievielte BuFaK ist das?*</Label>
            <Input
              type="number"
              min={1}
              max={99}
              value={this.state.bufakCount}
              disabled
              required
              id="bufakCount"/>
          </FormGroup>
        </Col>
      </Row>
      <Row>
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="sleep">Mit wem möchtest du auf einem Zimmer schlafen?*</Label>
              <Input
                type="select"
                value={this.state.sleep}
                disabled
                id="sleep"
              >
                <option value="same council">Eigene Fachschaft</option>
                <option value="same sex">Eigenes Geschlecht</option>
                <option value="no preferences">Egal</option>
              </Input>
            </FormGroup>
          </Col>
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="phone">Wie lautet deine Handynummer?</Label>
              <Input
                type="tel"
                value={this.state.phone}
                disabled
                id="phone"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="eat">Wie isst du?*</Label>
              <Input
                type="select"
                value={this.state.eat}
                disabled
                id="eat"
              >
                <option value="carnivorous">Alles</option>
                <option value="vegetarian">Vegetarisch</option>
                <option value="vegan">Vegan</option>

              </Input>
            </FormGroup>
          </Col>
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="intolerance">Hast du Unverträglichkeiten?*</Label>
              <Input
                type="select"
                value={this.state.intolerance}
                disabled
                id="intolerance"
              >
                <option value="no">Nein</option>
                <option value="yes">Ja</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          { this.state.intolerance === 'yes'  && 
          <Col xs="12" sm="6">
            <FormGroup>
              <Label for="intolerance_note">Welche Unverträglichkeiten hast du?*</Label>
              <Input
                type="textarea"
                value={this.state.intolerance_note}
                disabled
                id="intolerance_note"
              />
            </FormGroup>
          </Col>
        }
        <Col xs="12" sm="6">
            <FormGroup>
              <Label for="note">Hast du Anmerkungen?</Label>
              <Input
                type="textarea"
                value={this.state.note}
                disabled
                id="note"
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup check>
          <Label for="dataprotection" check>
            <Input type="checkbox" value={this.state.dataprotection} onChange={(e) => this.setState({dataprotection: e.target.checked}) } id="dataprotection" />{' '}
            Ich habe die Datenschutzerklärung gelesen und stimme ihr zu*
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label for="newsletter" check>
            <Input type="checkbox" value={this.state.newsletter} onChange={(e) => this.setState({newsletter: e.target.checked}) } id="newsletter" />{' '}
            Ich möchte mich zum BuFaK-Newsletter anmelden.
          </Label>
        </FormGroup>

        <Row>
          <Col xs="6" sm="6">
            <Button onClick={() => this.setState({activeStep: 1})}>Zurück</Button>
          </Col>
          <Col xs="6" sm="6" >
            <Button
              className="float-right"
              disabled={!this.state.dataprotection}
              onClick={(e) => this.handleSubmit()}
              >
                Absenden
              </Button>
          </Col>
        </Row>
      </div>
    )
  }

  renderResult() {
    const { fetching, error} = this.props
    if (fetching) {
      return (
        <PageSpinner color="primary"/>
      )
    } else if (error) {
      return (
        <Alert color="danger"><MdHighlightOff size={30}/>Ups... hier lief etwas schief! Versuche es später erneut oder kontaktiere den Ausrichter.</Alert>
      )
    } else {
      this.renderApplied();
    }
  }

  renderConferenceLoading() {
    return (
      <Card>
        <CardBody><PageSpinner color="secondary" /></CardBody>
      </Card>
    )
  }

  renderConferenceError() {
    return (
      <Card>
        <CardHeader>Fehler</CardHeader>
        <CardBody>
          <Alert color="danger">Die gewünschte Konferenz kann nicht geladen werden. Bitte versuche es später.</Alert>
        </CardBody>
      </Card>
    )
  }

  renderApplied() {
    return (
      <Card>
        <CardHeader>Anmeldung eingegangen</CardHeader>
        <CardBody>
          <Alert color="success"><MdCheckCircle size={30}/> Deine Anmeldung ist erfolgreich bei uns eingegangen.</Alert>
        </CardBody>
      </Card>
    )
  }

  handleSubmit() {
    this.setState({activeStep: 3})
    const { bufakCount, eat, intolerance, intolerance_note, phone, note, sleep} = this.state

    this.props.applyForConference({
      conferenceId: this.props.conferenceId,
      applicantUID: this.props.user.uid,
      isAlumnus: this.state.participant === 'alumnus',
      isBuFaKCouncil: this.state.participant === 'rat',
      isHelper: this.state.participant === 'helper',
      count: bufakCount,
      sleepingPref: sleep,
      tel: phone,
      eating: eat,
      priority: this.props.priority,
      intolerance: intolerance === 'yes' ? intolerance_note : 'none',
      note,
      status: 0
    })
  }

  render() {
    const {conference, conferenceId, fetching, error, userForConference} = this.props;
    const isUserApplied = () => isApplied(userForConference , conferenceId)
    return (
      <Page
        className="DashboardPage"
        title="Anmeldung"
      >
        { !conference && fetching && this.renderConferenceLoading()}
        { !conference && error && this.renderConferenceError()}
        { conference && isUserApplied() && this.renderApplied() }
        { conference && !conference.conferenceApplicationPhase && !isUserApplied() &&this.renderNoApplicationPhase()}
        { conference && conference.conferenceApplicationPhase && !isUserApplied() && this.renderApplicationForm()}
     </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      conferenceId: state.conference.conferenceId,
      conference: state.conference.conference,
      user: state.auth.user,
      userForConference: state.auth.userForConference,
      fetching: state.conference.fetching,
      error: state.conference.error,
      isPasswordValid: state.conference.isPasswordValid,
      priority: state.conference.priority,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getConference: () => dispatch(ConferenceActions.getConference()),
      applyForConference: (data) => dispatch(ConferenceActions.applyForConference(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage);
