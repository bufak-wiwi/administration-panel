import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React from 'react';
import Select from 'react-select';
import AuthActions from '../redux/authRedux';
import CouncilActions from'../redux/councilRedux';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Spinner, Alert } from 'reactstrap';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aggreed: false,
      email: '',
      password: '',
      remeberMe: false,
      councilID: 0,
      sex: '',
      street: '',
      zipcode: '',
      city: '',
      name: '',
      surname: '',
      note: '',
      birthday: ''
    };
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  componentDidMount() {
    this.props.getCouncilList()
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
    if(this.isLogin){ this.props.login(this.state.email, this.state.password, (this.state.remeberMe === 'on'))}
    if(this.isSignup){ this.props.registerUser({
      council_id: this.state.councilID, 
      name: this.state.name,
      surname: this.state.surname,
      birthday: this.state.birthday,
      email: this.state.email,
      password: this.state.password,
      sex: this.state.sex,
      note: this.state.note,
      address: this.state.zipcode + ';' + this.state.city + ';' + this.state.street,
    })}
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

  renderSignup(){
    const { councilList, confirmPasswordLabel, confirmPasswordInputProps, 
      nameLabel, nameInputProps, surnameLabel, surnameInputProps, streetInputProps,
      zipcodeInputProps, cityInputProps,
      } = this.props;
    var councilOptions = [];
    if (councilList){
      councilList.forEach(cl => {
        councilOptions.push({value: cl.councilID.toString(),label: cl.name + ", " + cl.university})
      })
    }
    return(
      <div>
      <FormGroup>
        <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
        <Input {...confirmPasswordInputProps} />
        
      </FormGroup>
      <FormGroup>
        <Label for={nameLabel}>{ nameLabel }</Label>
        <Input 
        value={this.state.name}
        onChange={e => this.setState({name: e.currentTarget.value})}
        { ...nameInputProps} />
      </FormGroup>
      <FormGroup>
        <Label for={surnameLabel}>{ surnameLabel }</Label>
        <Input 
        value={this.state.surname}
        onChange={e => this.setState({surname: e.currentTarget.value})}
        { ...surnameInputProps} />
      </FormGroup>
      <FormGroup>
        <Label> Fachschaftsrat</Label>
        <Select 
        onChange={e => this.setState({councilID: e.value})}
        options = {councilOptions} />
      </FormGroup>
      <FormGroup>
        <Label> <h4>Adresse</h4></Label>
        <Input
        value={this.state.street}
        onChange={e => this.setState({street: e.currentTarget.value})}
        {...streetInputProps} />
        <Input 
        value={this.state.zipcode}
        onChange={e => this.setState({zipcode: e.currentTarget.value})}
        {...zipcodeInputProps} />
        <Input 
        value={this.state.city}
        onChange={e => this.setState({city: e.currentTarget.value})}
        {...cityInputProps} />
      </FormGroup>
      <FormGroup>
        <Label>Geschlecht</Label>
        <Input 
        type="select"
        onChange={(sex) => this.setState({sex: sex.currentTarget.value})}>
          <option value="m">Männlich</option>
          <option value="w">Weiblich</option>
          <option value="kA">Keine Angabe</option>
        </Input>
      </FormGroup>
      <FormGroup>
          <Label for="Geburtsdatum">Geburtsdatum</Label>
          <Input
            type="date"
            name="date"
            value={this.state.birthday}
            onChange={e => this.setState({birthday: e.currentTarget.value})}
            placeholder="date placeholder"
          />
      </FormGroup>
      <FormGroup check>
        <Label check>
        <Input type="checkbox" 
                onChange={e => this.setState({aggreed: e.currentTarget.checked})}
                />{' '}
        Ich habe die Teilnahmebedingungen gelesen und akzeptiere sie
        </Label>
      </FormGroup>
      </div>
    )
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
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
        {this.isSignup && this.renderSignup()}
        {/* <FormGroup check>
          <Label check>
            <Input type="checkbox" onChange={remeberMe => this.setState({ remeberMe: remeberMe.target.value })}/>{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup> */}
        <hr />
        { error && <Alert color="danger">Ungültiger Login</Alert>}
        <Button
          disabled={this.isSignup && !this.state.aggreed}
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
  NameLabel: PropTypes.string,
  NameInputProps: PropTypes.object,
  SurnameLabel: PropTypes.string,
  SurnameInputProps: PropTypes.object,
  streetInputProps: PropTypes.object,
  zipcodeInputProps: PropTypes.object,
  cityInputProps: PropTypes.object,
  councilLabel: PropTypes.string,
  councilInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Persönliche Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Passwort',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Passwort bestätigen',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  councilLabel: 'Fachschauftsrat',
  councilInputProps: {
    type: 'select',
  },
  nameLabel: 'Vorname',
  nameInputProps: {
    type: 'text',
    placeholder: 'Vorname'
  },
  surnameLabel: 'Nachname',
  surnameInputProps: {
    type: 'text',
    placeholder: 'Nachname'
  },
  streetInputProps: {
    type: 'text',
    placeholder: 'Straße und Hausnummer'
  },
  zipcodeInputProps: {
    type: 'text',
    placeholder: 'PLZ'
  },
  cityInputProps: {
    type: 'text',
    placeholder: 'Stadt'
  },
  onLogoClick: () => {},
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.fetching,
    error: state.auth.error,
    user: state.auth.user,
    council: state.council.council,
    councilList: state.council.councilList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, remeberMe) => dispatch(AuthActions.login(email, password, remeberMe)),
    registerUser: (params) => dispatch(AuthActions.registerUser(params)),
    getCouncil: () => dispatch(CouncilActions.getCouncil()),
    getCouncilList: () => dispatch(CouncilActions.getCouncilList())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
