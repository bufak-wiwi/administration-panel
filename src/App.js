import GAListener from 'components/GAListener';
import { MainLayout, EmptyLayout } from 'components/Layout';
import LayoutRoute from 'components/Layout/LayoutRoute'
import { connect } from 'react-redux'
import React from 'react';
import AuthPage from 'pages/AuthPage';
import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import AuthActions from './redux/authRedux';
import './styles/reduction.scss';
import { PrivateRoute, AdministratorRoute, SuperAdminRoute } from './components/PrivateRoute'
import { Alert } from 'reactstrap';

import DashboardPage from './pages/DashboardPage';
import ApplicationPage from './pages/ApplicationPage';
import ProfilePage from './pages/ProfilePage';
import DataProtectionPage from './pages/DataProtectionPage'
import WorkshopApplicationPage from './pages/WorkshopApplicationPage'
import WorkshopOverviewPage from './pages/WorkshopOverviewPage'
import WorkshopSuggestionPage from './pages/WorkshopSuggestionPage'
import VotingListPage from './pages/VotingListPage'
import VotingPage from './pages/VotingPage'
import TravellInfoPage from './pages/TravellInfoPage';
import ReportUserPage  from './pages/ReportPage';
// Administrator
import PhasesPage from './pages/administrator/PhasesPage';
import ApplicationListPage from './pages/administrator/ApplicationListPage';
import ApplicationDetailsPage from './pages/administrator/ApplicationDetailsPage';
import WorkshopListPage from './pages/administrator/WorkshopListPage';
import WorkshopDetailsPage from 'pages/administrator/WorkshopDetailsPage';

//SuperAdmin
import ConferenceListPage from './pages/superAdmin/ConferenceListPage';
import QuestionListPage from './pages/superAdmin/QuestionListPage';
import QuestionDetailsPage from './pages/superAdmin/QuestionDetailsPage';
import QuestionResultPage from './pages/superAdmin/QuestionResultPage';
import QuestionResultListPage from './pages/superAdmin/QuestionResultListPage';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  componentWillMount() {
    const sessionstore = JSON.parse(sessionStorage.getItem('data'))
    if (!this.props.auth.user && sessionstore && sessionstore.user) {
      this.props.rehydrateState();
    }
  }
  
  render() {
    return (
      <div>
      {this.props.serverError && <Alert color="danger" style={{position:"absolute",width: "100%",textAlign:"center"}}>
        Uff, da ist ein Fehler aufgetreten. Bitte versuche es gleich nochmal oder wende dich an die <a href = {"mailto:"+process.env.REACT_APP_ADMIN_MAIL}>Admins</a>
      </Alert>}
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/datenschutz"
              layout={EmptyLayout}
              component={DataProtectionPage}
            />
           <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <PrivateRoute
              exact
              path="/"
              layout={MainLayout}
              component={DashboardPage}
            />
            <PrivateRoute
              exact
              path="/profile"
              layout={MainLayout}
              component={ProfilePage}
            />
            <PrivateRoute
              exact
              path="/anmeldung"
              layout={MainLayout}
              component={ApplicationPage}
            />
            <PrivateRoute
              exact
              path="/workshop"
              layout={MainLayout}
              component={WorkshopApplicationPage}
            />
            <PrivateRoute
              exact
              path="/ws-einreichen"
              layout={MainLayout}
              component={WorkshopSuggestionPage}
            />
            <PrivateRoute
              exact
              path="/reiseinfos"
              layout={MainLayout}
              component={TravellInfoPage}
            />
            <PrivateRoute
              exact
              path="/workshop-uebersicht"
              layout={MainLayout}
              component={WorkshopOverviewPage}
            />
            <PrivateRoute
              exact
              path="/abstimmung"
              layout={MainLayout}
              component={VotingListPage}
            />
            <PrivateRoute
              exact
              path="/meldeliste"
              layout={MainLayout}
              component={ReportUserPage}
            />
            <PrivateRoute
              exact
              path="/abstimmung/:id"
              layout={MainLayout}
              component={VotingPage}
            />
            <AdministratorRoute
              exact
              path="/phasen"
              layout={MainLayout}
              component={PhasesPage}
            />
            <AdministratorRoute
              exact
              path="/workshop-list"
              layout={MainLayout}
              component={WorkshopListPage}
            />
            <AdministratorRoute
              exact
              path="/workshop-list/new"
              layout={MainLayout}
              component={props => (
                <WorkshopDetailsPage {...props} empty={true} />
              )}
            />
            <AdministratorRoute
              exact
              path="/workshop-list/:id"
              layout={MainLayout}
              component={WorkshopDetailsPage}
            />
            <AdministratorRoute
              exact
              path="/application"
              layout={MainLayout}
              component={ApplicationListPage}
            />
            <AdministratorRoute
              exact
              path="/application/:uid"
              layout={MainLayout}
              component={ApplicationDetailsPage}
            />
            <SuperAdminRoute
              exact
              path="/conference/"
              layout={MainLayout}
              component={ConferenceListPage}
            />
            <SuperAdminRoute
              exact
              path="/question/"
              layout={MainLayout}
              component={QuestionListPage}
            />
            <SuperAdminRoute
              exact
              path="/question/new"
              layout={MainLayout}
              component={props => (
                <QuestionDetailsPage {...props} empty={true} />
              )}
            />
            <SuperAdminRoute
              exact
              path="/question/:id"
              layout={MainLayout}
              component={QuestionDetailsPage}
            />
            <SuperAdminRoute
              exact
              path="/questionresult/"
              layout={MainLayout}
              component={QuestionResultListPage}
            />
            <SuperAdminRoute
              exact
              path="/questionresult/:id"
              layout={MainLayout}
              component={QuestionResultPage}
            />
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
      </div>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    conferenceId: state.conference.conferenceId,
    serverError: state.auth.serverError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    rehydrateState: () => dispatch(AuthActions.rehydrateState()),
  }
}

export default componentQueries(query)(connect(mapStateToProps, mapDispatchToProps)(App));
