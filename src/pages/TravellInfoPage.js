import Page from 'components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {getUserTravelInfos} from '../sagas/travelSagas'
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
import { isAttendee,isRejected, isApplied } from '../utils/functions'
import {
  MdCheckCircle,
  MdHighlightOff
} from 'react-icons/md';
import PasswordProtection from '../components/PasswordProtection'
// import { getColor } from 'utils/colors';

class TravelInformationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participant: 'alumnus',
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
      participantAgreement: false,
    }
  }
  
  componentDidMount() {
    this.props.getUserTravelInfos(this.props.user.uid)
  }

  renderUserIsRejected = () => {
      return (
        <Card>
            <CardHeader>Anmeldung zur Konferenz wurde nicht angenommen.</CardHeader>
            <CardBody>
                Deine Anmeldung für {this.props.conference ? this.props.conference.name : 'ausgewählte BuFaK'} wurde abgelehnt.
            </CardBody>
        </Card>
      )
  }

  renderUserIsApplied = () => {
    return (
      <Card>
          <CardHeader>Anmeldung zur Konferenz ist eingegangen.</CardHeader>
          <CardBody>
              Deine Anmeldung für {this.props.conference ? this.props.conference.name : 'ausgewählte BuFaK'} ist beim Ausrichter eigegangen. Sobald die Anmeldung angenommen wurde, kannst du deine Informationen zu An und Abreise hinterlegen.
          </CardBody>
      </Card>
    )
}

  renderTravelInfos = () => {
    return (
      <Card>
          <CardHeader>Test</CardHeader>
          <CardBody>
              Test
          </CardBody>
      </Card>
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
    const participant = this.props.isOtherKey ? this.state.participant : 'pariticipant'

    this.props.applyForConference({
      conferenceId: this.props.conferenceId,
      applicantUID: this.props.user.uid,
      isAlumnus: participant === 'alumnus',
      isBuFaKCouncil: participant === 'rat',
      isHelper: participant === 'helper',
      count: bufakCount,
      sleepingPref: sleep,
      tel: phone,
      eating: eat,
      priority: this.props.priority,
      intolerance: intolerance === 'yes' ? intolerance_note : 'none',
      note,
      status: 0,
      key: this.props.password,
      newsletter: this.state.newsletter,
    })
  }

  render() {
    const {conference, conferenceId, fetching, error, userForConference} = this.props;
    const isUserAttendee = () => isAttendee(userForConference , conferenceId)
    return (
      <Page
        className="DashboardPage"
        title="An und Abreise"
      >
        {console.log(isRejected())}
        {/* { !conference && fetching && this.renderConferenceLoading()}
        { !conference && error && this.renderConferenceError()} */}
        { conference && isRejected() &&this.renderUserIsRejected()}
        { conference && isApplied() &&this.renderUserIsApplied()}
        { conference && isAttendee() && this.renderTravelInfos()}
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
      // password protection
      password: state.conference.password,
      isPasswordValid: state.conference.isPasswordValid,
      priority: state.conference.priority,
      isOtherKey: state.conference.isOtherKey,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch(getUserTravelInfos(uid)),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TravelInformationPage);
