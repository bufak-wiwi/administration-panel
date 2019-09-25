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
import { PrivateRoute, AdministratorRoute } from './components/PrivateRoute'

import DashboardPage from './pages/DashboardPage';
import ApplicationPage from './pages/ApplicationPage';
import ProfilePage from './pages/ProfilePage';
import DataProtectionPage from './pages/DataProtectionPage'
// Administrator
import PhasesPage from './pages/administrator/PhasesPage';
import ApplicationListPage from './pages/administrator/ApplicationListPage';
import ApplicationDetailsPage from './pages/administrator/ApplicationDetailsPage';
import WorkshopListPage from './pages/administrator/WorkshopListPage';
import WorkshopDetailsPage from 'pages/administrator/WorkshopDetailsPage';

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
            <AdministratorRoute
              exact
              path="/phasen"
              layout={MainLayout}
              component={PhasesPage}
            />
            <AdministratorRoute
              exact
              path="/workshops"
              layout={MainLayout}
              component={WorkshopListPage}
            />
            <AdministratorRoute
              exact
              path="/workshops/new"
              layout={MainLayout}
              component={props => (
                <WorkshopDetailsPage {...props} empty={true} />
              )}
            />
            <AdministratorRoute
              exact
              path="/workshops/:id"
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
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    rehydrateState: () => dispatch(AuthActions.rehydrateState()),
  }
}

export default componentQueries(query)(connect(mapStateToProps, mapDispatchToProps)(App));
