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
import AuthActions from '../../redux/authRedux';
import CouncilActions from '../../redux/councilRedux'
import { Tooltip } from '@material-ui/core';
import DetailsHeader from '../../components/DetailsHeader';
import DetailsBody from '../../components/DetailsBody';
import { shouldObjectBeUpdated } from '../../utils/functions';

class UserDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          editing: false,
          user: null,
        }
    }

    componentDidMount() {
      const { uid } = this.props.match.params
      // We use getApplication to fetch the user data because we don't have a direct "getUser(uid)" generic action wired up easily without side effects
      // getApplication(uid) fetches the application for the user, which contains the user object.
      this.props.getApplication(uid)
      if (!this.props.councilList || this.props.councilList.length === 0) {
        this.props.getCouncilList()
      }
    }

    componentWillUnmount() {
      this.props.updateApplication(null)
    }

    componentDidUpdate(prevProps) {
        // When application is loaded, set user state
        if (this.props.application && !this.state.user) {
             this.setState({ user: this.props.application.user })
        }
        // If we switched users
        if (this.props.application && prevProps.application && this.props.application.applicantUID !== prevProps.application.applicantUID) {
            this.setState({ user: this.props.application.user })
        }
    }

    getCouncilName(councilId) {
      const council = this.props.councilList.find(x => x.councilID === councilId)
      return council ? council.name : councilId
    }

    onCancel() {
      this.setState({
        editing: false,
        user: this.props.application.user
      })
    }

    onSave() {
      this.setState({
        editing: false
      })
      this.props.updateAnyUser(this.state.user.uid, this.state.user)
    }

    renderCouncilFormGroup() {
        return (
          <FormGroup key="council">
            <Label for="council">Fachschaft</Label>
             <Input type="text" disabled value={this.getCouncilName(this.state.user.councilID) || ''} />
          </FormGroup>
        )
    }

    render() {
        const { user, editing } = this.state
        const { application, councilList } = this.props;
    
        if (!application || !user || councilList.length === 0) {
          return (
            <PageSpinner color="primary" />
          );
        }  
    
        const properties = [
          { name: 'Vorname', type: 'text', id: 'name'},
          { name: 'Nachname', type: 'text', id: 'surname'},
          { name: 'Email', type: 'email', id: 'email'},
          { name: 'Adresse', type: 'textarea', id: 'address'},
          { name: 'Geschlecht', type: 'select', id: 'sex', options: [
              { value: 'm', name: 'Männlich'},
              { value: 'w', name: 'Weiblich'},
              { value: 'd', name: 'Divers'}
          ]},
          { type: 'custom', component: this.renderCouncilFormGroup(), id: 'council'},
          { name: 'Anmerkung', type: 'textarea', id: 'note'},
        ]
    
        return (
          <Page
            className="UserDetailsPage"
            title={'Nutzer Details'}
          >
            <Card>
              <DetailsHeader
                title={ user.name + ' ' + user.surname}
                empty={false}
                editing={editing}
                onEdit={() => this.setState({ editing: true})}
                onCancel={() => this.onCancel()}
                onSave={() => this.onSave()}
                disabled={false}
              />
              <DetailsBody
                disabled={!editing}
                object={this.state.user}
                onChange={(id, value) => this.setState({ user: {...user, [id]: value}})}
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
    updateApplication: (app) => dispatch(ConferenceActions.updateApplication(app)),
    updateAnyUser: (uid, user) => dispatch(AuthActions.updateAnyUser(uid, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage);
