import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React from 'react';
import AuthActions from '../redux/authRedux'
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Spinner, Alert } from 'reactstrap';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remeberMe: false
    };
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password, (this.state.remeberMe === 'on'))
  };

  renderButtonText() {
    const { buttonText, isFetching } = this.props;

    if (isFetching) {
      return (
        <Spinner color="secondary" />
      )
    }
    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
      error,
      redirectAfterLogin,
    } = this.props;
    if (this.props.user || this.state.user) {
      return (
        <Redirect
          to={redirectAfterLogin || '/'}
        />
      )
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input 
            value={this.state.email}
            onChange={email => this.setState({ email: email.target.value})}
            {...usernameInputProps} 
          />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input 
           value={this.state.password}
           onChange={password => this.setState({ password: password.target.value})}
          {...passwordInputProps}
          />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} />
          </FormGroup>
        )}
        {/* <FormGroup check>
          <Label check>
            <Input type="checkbox" onChange={remeberMe => this.setState({ remeberMe: remeberMe.target.value })}/>{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup> */}
        <hr />
        { error && <Alert color="danger">Ungültiger Login</Alert>}
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.fetching,
    error: state.auth.error,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, remeberMe) => dispatch(AuthActions.login(email, password, remeberMe))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
