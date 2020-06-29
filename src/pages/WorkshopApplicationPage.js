import Page from 'components/Page';
import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Alert, Button, Row, FormGroup, Input, Label } from 'reactstrap'
import WorkshopActions from '../redux/workshopRedux'
import { Stepper, Step, StepLabel, StepContent, Dialog, Slide, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import PageSpinner from '../components/PageSpinner';
import { toGermanTime, isAttendee } from '../utils/functions';
import Delay from '../components/Delay'
import WorkshopApplicationCard from '../components/Widget/WorkshopApplicationCard';
import {Link} from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class WorkshopApplicationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activeStep: 0,
        mounted: false,
        steps: [],
        selected: null,
        isOpen: false,
    }
  }

  componentDidMount() {
    this.props.getWorkshopList()
    this.props.getWorkshopApplication(this.props.user.uid)
  }

  componentDidUpdate() {
      if (this.props.workshopList && this.props.workshopList.length !== 0 && !this.state.mounted) {
        const steps = ["Workshopwahl"];
        const selected = {};
        [...new Set(this.props.workshopList.map(x => x.start))].sort().forEach(x => {
            selected[toGermanTime(x)] = { prio1: "", prio2: "", prio3: ""};
            steps.push(toGermanTime(x))
        })
        this.setState({ steps, selected, mounted: true })
      }
  }

  isNextDisabled(step) {
    if (step === 0 || step === this.state.steps.length -1) {
      return false;
    }
    const time = this.state.steps[step];
    const selected = this.state.selected[time];
    return !selected.prio1 || !selected.prio2 || !selected.prio3
  }

  getStepContent(step) {
      if(step === 0) {
        return <Alert color="info">Auf dieser Seite kannst du deine Workshops für die BuFaK wählen.<br />Bei jedem Zeitslot musst du deine Priorität 1 bis 3 angeben.</Alert>
      } else {
        return this.renderSelectionForTime(step)
      }
  }

  renderSelectionForTime(step) {
    const time = this.state.steps[step];
    const selected = this.state.selected[time];
    const workshops = this.props.workshopList.filter(x => toGermanTime(x.start) === time)
      /* eslint-disable eqeqeq */
      return (
        <div>
        <FormGroup>
          <Label for="prio1">Priorität 1:</Label>
          <Input type="select" value={selected.prio1} id="prio1" onChange={e => this.setState({selected: {...this.state.selected, [time]: { ...selected, prio1: e.currentTarget.value }} })}>
            <option value="" disabled></option>
            { workshops.map(x => 
              <option key={x.workshopID + "-prio1"} value={x.workshopID} disabled={selected.prio2 == x.workshopID || selected.prio3 == x.workshopID}>{x.name}</option>
            )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="prio2">Priorität 2:</Label>
          <Input type="select" value={selected.prio2} id="prio2" onChange={e => this.setState({selected: {...this.state.selected, [time]: { ...selected, prio2: e.currentTarget.value }} })}>
            <option value="" disabled></option>
            { workshops.map(x => 
              <option key={x.workshopID + "-prio2"} value={x.workshopID} disabled={selected.prio1 == x.workshopID || selected.prio3 == x.workshopID}>{x.name}</option>
            )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="prio3">Priorität 3:</Label>
          <Input type="select" value={selected.prio3} id="prio3" onChange={e => this.setState({selected: {...this.state.selected, [time]: { ...selected, prio3: e.currentTarget.value }} })}>
            <option value="" disabled></option> 
            { workshops.map(x => 
              <option key={x.workshopID + "-prio3"} value={x.workshopID} disabled={selected.prio1 == x.workshopID || selected.prio2 == x.workshopID}>{x.name}</option>
            )}
          </Input>
        </FormGroup>
        </div>
      )
  }

  renderStepper() {
      const { activeStep, steps } = this.state;
      return (
          <Stepper activeStep={activeStep} orientation="vertical">
              { steps.map((label, index) => (
                  <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                      <StepContent>
                        {this.getStepContent(index)}
                        <Row style={{ justifyContent: 'space-between'}}>
                            { activeStep == 0 && <Link to="/workshop-uebersicht"><Button>Zur Workshopübersicht</Button></Link>}
                            { activeStep !== 0 && <Button onClick={() => this.setState({ activeStep: activeStep-1})}>Zurück</Button>}
                            <Button
                                color="primary"
                                disabled={this.isNextDisabled(activeStep)}
                                onClick={() => activeStep === steps.length - 1 ? this.setState({ isOpen: true }) : this.setState({ activeStep: activeStep+1})}
                            >
                                {activeStep === steps.length - 1 ? 'Absenden' : 'Weiter'}
                            </Button>
                        </Row>
                      </StepContent>
                  </Step>
              ))}
          </Stepper>
      )
  }

  renderConfirm() {
    return (
      <Dialog
          open={this.state.isOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.setState({ isOpen: false})}
          aria-labelledby="title"
          aria-describedby="description"
      >
          <DialogTitle id="title">Bist du dir sicher?</DialogTitle>
          <DialogContent>
              <DialogContentText id="description">
                Sind alle deine Eingaben korrekt? Du kannst deine Workshopauswahl nicht mehr verändern.
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button outline onClick={() => this.setState({ isOpen: false})} color="primary">Abbrechen</Button>
              <Button outline onClick={() => this.props.uploadWorkshopApplication(this.state.selected)} color="danger">Absenden</Button>
          </DialogActions>
      </Dialog>
    )
  }

  render() {
    const {
      workshopList,
      fetching,
      success,
      error,
      workshopApplication,
      conference,
      userForConference,
      conferenceId
    } = this.props

    if ((workshopApplication !== [] && workshopApplication.length !== 0)
      || (!conference || !conference.workshopApplicationPhase)
      || !isAttendee(userForConference, conferenceId)
    ) {
      return (
        <Page
        title={'Workshopanmeldung'}
      >
        <WorkshopApplicationCard show={true} />
      </Page>
      )
    }
    
    return (
      <Page
        title={'Workshopanmeldung'}
      >
        { !fetching && success && <Card><CardBody><Alert color="success">Deine Workshopanmeldung wurde erfolgreich abgesendet!</Alert></CardBody></Card>}
        { error && <Card><CardBody><Alert color="danger">Deine Workshopanmeldung war fehlerhaft. Bitte versuche es erneut.</Alert></CardBody></Card>}
        { !error && (fetching || !workshopList) && <Card><CardBody><PageSpinner/></CardBody></Card>}
        { !error && !success && workshopList && 
            <Delay wait={500}><Card>
                <CardBody>{this.renderStepper()}</CardBody>
                { this.renderConfirm() }
            </Card></Delay>
        }
     </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conference: state.conference.conference,
    workshopList: state.workshop.workshopList,
    workshopApplication: state.workshop.workshopApplication,
    fetching: state.workshop.fetching,
    success: state.workshop.success,
    error: state.workshop.error,
    user: state.auth.user,
    conferenceId: state.conference.conferenceId,
    userForConference: state.auth.userForConference,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWorkshopList: () => dispatch(WorkshopActions.getWorkshopList()),
    getWorkshopApplication: (uid) => dispatch(WorkshopActions.getWorkshopApplication(uid)),
    uploadWorkshopApplication: (application) => dispatch(WorkshopActions.uploadWorkshopApplication(application)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopApplicationPage);
