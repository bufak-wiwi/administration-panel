import Page from 'components/Page';
import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap'
import PageSpinner from '../components/PageSpinner';
import AuthActions from '../redux/authRedux';
import ConferenceActions from '../redux/conferenceRedux';
import CouncilActions from '../redux/councilRedux';
import DetailsHeader from '../components/DetailsHeader';
import DetailsBody from '../components/DetailsBody';
import { shouldObjectBeUpdated } from '../utils/functions';
import ResetForm from '../components/ResetForm';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : null,
      editing: false,
      councilLoaded: false,
      properties: [
        { name: 'Vorname', type: 'text', id: 'name'},
        { name: 'Nachname', type: 'text', id: 'surname'},
        { name: 'Geschlecht', type: 'select', id: 'sex', options: [
          { value: 'm', name: 'Männlich'},
          { value: 'w', name: 'Weiblich'},
          { value: 'na', name: 'Keine Angabe'},
        ]},
        { name: 'E-Mail', type: 'email', id: 'email', readOnly: true },
        { name: 'Straße Hausnummer', type: 'text', id: 'street'},
        { name: 'PLZ', type: 'text', id: 'zipcode', xs: 6, md: 3, xl: 3},
        { name: 'Stadt', type: 'text', id: 'city', xs: 6, md: 3, xl: 3},
        { name: 'Geburtstag', type: 'date', id: 'birthday'}
      ]
    }
  }

  componentDidMount() {
    this.props.getCouncilList()
    this.props.getUser();
  }

  componentDidUpdate() {
    if(shouldObjectBeUpdated(this.state.user, this.props.user, this.state.editing)) {
      var addressarray = this.props.user.address.split(';');
      const user = {
        ...this.props.user,
        zipcode: addressarray[0],
        city: addressarray[1],
        street: addressarray[2]
      }
       this.setState({ user });
    }
    if (!this.state.councilLoaded && this.props.councilList.length > 0) {
      this.updateCouncilList()
    }
  }

  updateCouncilList() {
    var councilList = [];
    this.props.councilList.forEach(cl => {
      councilList.push({value: cl.councilID ,label: cl.name + ", " + cl.university})
    })
    this.setState({ councilLoaded: true, properties: [...this.state.properties, {name: 'Fachschaftsrat', type: 'react-select', id: 'councilID', options: councilList}] })
  }

  onCancel() {
    this.setState({
      editing: false,
    })
  }

  isDataValid() {
    const { user } = this.state;
    return user.name 
      && user.surname
      && user.sex
      && user.birthday
      && user.councilID
      && user.street
      && user.zipcode
      && user.city
  }

  onSave() {
    if (this.isDataValid()) {
      this.setState({
        editing: false,
      })
      const { user } = this.state
      this.props.putUser({...this.state.user, address: user.zipcode + ";" + user.city + ";" + user.street});
    }
  }

  render() {
    const { conference } = this.props;
    const { user, editing } = this.state;
     if (!conference || !this.state.user) {
       return (
         <PageSpinner color="primary" />
       );
     }
    return (
      <Page
        title={'Profil'}
      >
        <Card>
        <DetailsHeader
          title={user.name + ' ' + user.surname}
          empty={false}
          editing={editing}
          onEdit={() => this.setState({ editing: true})}
          onCancel={() => this.onCancel()}
          onSave={() => this.onSave()}
          disabled={!this.isDataValid()}
        />
        <DetailsBody
          disabled={!editing}
          object={this.state.user}
          onChange={(id, value) => this.setState({ user: {...user, [id]: value}})}
          properties={this.state.properties}
        />
        <ResetForm show={editing} />
        </Card>
     </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    conference: state.conference.conference,
    council: state.council.council,
    councilList: state.council.councilList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(AuthActions.getUser()),
    putUser: (user) => dispatch(AuthActions.putUser(user)),
    getConference: () => dispatch(ConferenceActions.getConference()),
    getCouncilList: () => dispatch(CouncilActions.getCouncilList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
