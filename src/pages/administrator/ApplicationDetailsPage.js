import Page from '../../components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import PageSpinner from '../../components/PageSpinner';
import ConferenceActions from '../../redux/conferenceRedux';
import CouncilActions from '../../redux/councilRedux'
import { Tooltip } from '@material-ui/core';
import DetailsHeader from '../../components/DetailsHeader';
import DetailsBody from '../../components/DetailsBody';
import { shouldObjectBeUpdated } from '../../utils/functions';

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
        }
    }

    componentDidMount() {
      const { uid } = this.props.match.params
      this.props.getApplication(uid)
      if (!this.props.councilList || this.props.councilList.length === 0) {
        this.props.getCouncilList()
      }
    }

    componentWillUnmount() {
      this.props.updateApplication()
    }

    componentDidUpdate() {
      if (shouldObjectBeUpdated(this.state.application, this.props.application, this.state.editing)) {
        this.setState({ application: this.props.application})
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

  renderPriorityFormGroup() {
    return (
      <FormGroup key="priority">
        <Label for="priority">Priorität</Label>
        <Input
          type="select"
          id="priority"
          disabled={!this.state.editing}
          value={ this.getPriorityOrType(this.state.application)}
          onChange={(e) => this.onPriorityChange(e.currentTarget.value)}
          >
            { priorities.map(x => <option key={x.name} value={x.id === "priority" ? x.name : x.id}>{x.name}</option>)}
          </Input>
      </FormGroup>
    )
  }

  renderCouncilFormGroup() {
    return (
      <FormGroup key="council">
        <Label for="council">Fachschaft</Label>
        <Tooltip title="Diese Information muss der Nutzer selber in seinem Profil ändern">
         <Input type="text" disabled value={this.getCouncilName(this.state.application.user.councilID)} />
        </Tooltip>
      </FormGroup>
    )
  }

  renderUniversityFormGroup() {
    return (
      <FormGroup key="university">
        <Label>Hochschule</Label>
        <Tooltip title="Diese Information muss der Nutzer selber in seinem Profil ändern">
         <Input type="text" disabled value={this.getCouncilUniversity(this.state.application.user.councilID) } />
        </Tooltip>
      </FormGroup>
    )
  }

  render() {
    const { application, editing } = this.state
    const { councilList } = this.props;

    if (!application || councilList.length === 0) {
      return (
        <PageSpinner color="primary" />
      );
    }  

    const properties = [
      { name: 'Status', type: 'select', id: 'status', options: [
        { value: 'HasApplied', name: 'Ausstehend' },
        { value: 'IsAttendee', name: 'Angenommen' },
        { value: 'IsRejected', name: 'Abgelehnt' },
      ]},
      { type: 'custom', component: this.renderPriorityFormGroup(), id: 'priority'},
      { type: 'custom', component: this.renderCouncilFormGroup(), id: 'council'},
      { type: 'custom', component: this.renderUniversityFormGroup(), id: 'university'},
      { name: 'Unterkunft', type: 'text', id: 'hotel'},
      { name: 'Zimmer', type: 'text', id: 'room'},
      { name: 'Anmerkung', type: 'textarea', id: 'note', xs: 12, md: 12, xl: 12}
    ]

    return (
      <Page
        className="ApplicationListPage"
        title={'Anmeldung'}
      >
        <Card>
          <DetailsHeader
            title={ application.user.name + ' ' + application.user.surname}
            empty={false}
            editing={editing}
            onEdit={() => this.setState({ editing: true})}
            onCancel={() => this.onCancel()}
            onSave={() => this.onSave()}
            disabled={false}
          />
          <DetailsBody
            disabled={!editing}
            object={this.state.application}
            onChange={(id, value) => this.setState({ application: {...application, [id]: value}})}
            properties={properties}
          />      
        </Card>
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
