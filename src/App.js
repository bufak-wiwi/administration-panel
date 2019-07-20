import GAListener from 'components/GAListener';
import { MainLayout, EmptyLayout } from 'components/Layout';
import LayoutRoute from 'components/Layout/LayoutRoute'
import { connect } from 'react-redux'
import PageSpinner from 'components/PageSpinner';
import React from 'react';
import AuthPage from 'pages/AuthPage';
import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthActions from './redux/authRedux';
import './styles/reduction.scss';

const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const ApplicationPage = React.lazy(() => import('pages/ApplicationPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    const PrivateRoute = (route) => {
      console.log('rote path inside App', route)
      const sessionstore = JSON.parse(sessionStorage.getItem('data'))
      if (!this.props.auth.user && sessionstore && sessionstore.user) {
        this.props.rehydrateState();
      }
      if (this.props.auth.user) {
        return (
          <Route
            {...route}
          />
        )
      } else {
        return (
          <Redirect 
          to={{ pathname: '/login' , state: { from: route.path}}} 
          />
        )
      }
    }

    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
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

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <PrivateRoute exact path="/" component={(props) => (<DashboardPage {...props}/>)} />
                <PrivateRoute exact path="/anmeldung" component={(props) => (<ApplicationPage {...props}/>)} />
              </React.Suspense>
            </MainLayout>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    rehydrateState: () => dispatch(AuthActions.rehydrateState())
  }
}

export default componentQueries(query)(connect(mapStateToProps, mapDispatchToProps)(App));
