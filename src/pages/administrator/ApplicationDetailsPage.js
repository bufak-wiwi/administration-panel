import Page from '../../components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'
import PageSpinner from '../../components/PageSpinner';
import ConferenceActions from '../../redux/conferenceRedux';
import CouncilActions from '../../redux/councilRedux'
import { Tooltip } from '@material-ui/core';

const priorities = [
    {name: '1', id: 'priority', value: 1},
    {name: '2', id: 'priority', value: 2},
    {name: '3', id: 'priority', value: 3},
    {name: '4', id: 'priority', value: 4},
    {name: '5', id: 'priority', value: 5},
    {name: '6', id: 'priority', value: 6},
    {name: 'Alumnus', id: 'isAlumnus', value: true},
    {name: 'BuFaK Rat', id: 'isBuFaKCouncil', value: true},
    {name: 'Helfer', id: 'isHelper',  value: true},
]

class ApplicationDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          editing: false,
          application: null,
          loaded: false
        }
    }

    componentDidMount() {
      if (!this.props.application || !this.props.councilList) {
        const { uid } = this.props.match.params
        this.props.getApplication(uid)
        this.props.getCouncilList()
      }
    }

    componentWillUnmount() {
      this.props.updateApplication()
    }

    componentDidUpdate(prevProps, prevState) {
      if (!this.state.loaded && this.props.application !== this.state.application) {
        this.setState({ application: this.props.application, loaded: true})
      }
    }


    getCouncilName(councilId) {
      const council = this.props.councilList.find(x => x.councilID === councilId)
      return council ? council.name : councilId
    }

    getCouncilUniversity(councilId) {
      const council = this.props.councilList.find(x => x.councilID === councilId)
      return council ? council.university : 'unbekannt'
    }

    getPriorityOrType(x) {
      if (x.isAlumnus) {
        return 'isAlumnus'
      }
      if (x.isHelper) {
        return 'isHelper'
      }
      if (x.isBuFaKCouncil) {
        return 'isBuFaKCouncil'
      }
      return x.priority
    }

    getStatus(x) {
       switch(x.status) {
          case 'HasApplied':
              return 'ausstehend'
          case 'IsRejected':
              return 'abgelehnt'
          case 'IsAttendee':
              return 'angenommen'
          default:
              return 'unbekannt'
       } 
    }

    onPriorityChange(prio) {
      switch (prio) {
        case 'isAlumnus':
          this.setState({ application: {...this.state.application, priority: 0, isAlumnus: true, isHelper: false, isBuFaKCouncil: false}})
          break;
        case 'isBuFaKCouncil':
            this.setState({ application: {...this.state.application, priority: 0, isAlumnus: false, isHelper: false, isBuFaKCouncil: true}})
            break;
        case 'isHelper':
            this.setState({ application: {...this.state.application, priority: 0, isAlumnus: false, isHelper: true, isBuFaKCouncil: false}})
            break;
        default:
          this.setState({ application: {...this.state.application, priority: parseInt(prio), isAlumnus: false, isHelper: false, isBuFaKCouncil: false}})
      }
    }

  onCancel() {
    this.setState({
      editing: false,
      application: this.props.application
    })
  }

  onSave() {
    this.setState({
      editing: false
    })
    this.props.uploadApplication(this.state.application)
  }

  render() {
    const { application, editing } = this.state
    const { councilList } = this.props;
    if (!application || councilList.length === 0) {
      return (
        <PageSpinner color="primary" />
      );
    }  

    return (
      <Page
        className="ApplicationListPage"
        title={'Anmeldung'}
      >
        <Row>
          <Col>
            <Card>
                <CardHeader>
                  <Row style={{ justifyContent: 'space-between'}}>
                  { application.user.surname + ' ' + application.user.name}
                  <div>
                  { !editing && <Button onClick={() => this.setState({ editing: true})}>Bearbeiten</Button>}
                  { editing && <Button style={{ marginRight: 10}} onClick={() => this.onCancel()}>Abbrechen</Button>}
                  { editing && <Button onClick={() => this.onSave()}>Speichern</Button>}
                  </div>
                  </Row>
                </CardHeader>
                <CardBody>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="status">Status</Label>
                      <Input
                        type="select"
                        id="status"
                        disabled={!this.state.editing}
                        value={ application.status}
                        onChange={(e) => this.setState({ application: {...this.state.application, status: e.currentTarget.value}})}
                        >
                          <option value="HasApplied">ausstehend</option>
                          <option value="IsAttendee">angenommen</option>
                          <option value="IsRejected">abgelehnt</option>
                        </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="">Status</Label>
                      <Input
                        type="select"
                        id="priority"
                        disabled={!this.state.editing}
                        value={ this.getPriorityOrType(application)}
                        onChange={(e) => this.onPriorityChange(e.currentTarget.value)}
                        >
                          { priorities.map(x => <option key={x.name} value={x.id === "priority" ? x.name : x.id}>{x.name}</option>)}
                        </Input>
                      </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="council">Fachschaft</Label>
                      <Tooltip title="Diese Information muss der Nutzer selber in seinem Profil ändern">
                      <Input type="text" disabled value={this.getCouncilName(application.user.councilID)} />
                      </Tooltip>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Hochschule</Label>
                      <Tooltip title="Diese Information muss der Nutzer selber in seinem Profil ändern">
                      <Input type="text" disabled value={this.getCouncilUniversity(application.user.councilID) } />
                      </Tooltip>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="hotel">Hotel</Label>
                      <Input
                        type="text"
                        disabled={!editing}
                        id="hotel"
                        value={application.hotel || ''}
                        onChange={e => this.setState({ application: {...this.state.application, hotel: e.currentTarget.value}})}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label for="room">Zimmer</Label>
                      <Input
                        type="text"
                        disabled={!editing}
                        id="room"
                        value={application.room || ''}
                        onChange={e => this.setState({ application: {...this.state.application, room: e.currentTarget.value}})}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="12">
                    <FormGroup>
                      <Label for="note">Anmerkung</Label>
                      <Input 
                        type="textarea"
                        id="note"
                        disabled={!editing}
                        value={application.note}
                        onChange={e => this.setState({ application: {...this.state.application, note: e.currentTarget.value}})}
                      />
                    </FormGroup>
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
    application: state.conference.application,
    councilList: state.council.councilList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getApplication: (uid) => dispatch(ConferenceActions.getApplication(uid)),
    getCouncilList: () => dispatch(CouncilActions.getCouncilList()),
    uploadApplication: (application) => dispatch(ConferenceActions.uploadApplication(application)),
    updateApplication: () => dispatch(ConferenceActions.updateApplication(null))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetailsPage);
