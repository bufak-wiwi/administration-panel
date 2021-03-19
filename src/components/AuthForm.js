import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React from 'react';
import Select from 'react-select';
import AuthActions from '../redux/authRedux';
import CouncilActions from'../redux/councilRedux';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Spinner, Alert, FormFeedback } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MDButton from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { MdClose } from 'react-icons/md';
import IconButton from '@material-ui/core/IconButton';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aggreed: false,
      email: '',
      password: '',
      passwordConfirm: '',
      remeberMe: false,
      councilID: 0,
      sex: 'm',
      street: '',
      zipcode: '',
      city: '',
      name: '',
      surname: '',
      note: '',
      birthday: '',
      passwordForgot: false,
      displayMessage: false,
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

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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

  renderPasswordForgot() {
    return (
      <div>
        <Dialog open={this.state.passwordForgot} onClose={() => this.setState({ passwordForgot: false})} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Passwort zurücksetzen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Falls die eingegebene E-Mail-Adresse im System hinterlegt ist, wirst du in wenigen Minuten eine E-Mail zum Zurücksetzen deines Passworts erhalten. 
              Bitte überprüfe auch den Spam-Ordner.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="E-Mail-Adresse"
              type="email"
              fullWidth
              value={this.state.email}
              onChange={e => this.setState({ email: e.currentTarget.value})}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ passwordForgot: false})} color="primary">
              Abbrechen
            </Button>
            <Button onClick={() => this.resetPassword()} color="primary">
              Zurücksetzen
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.displayMessage}
          autoHideDuration={6000}
          onClose={() => this.setState({ displayMessage: false})}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Bei korrekter E-Mail-Adresse wird dein Passwort zurückgesetzt.</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => this.setState({ displayMessage: false})}
            >
              <MdClose />
            </IconButton>,
          ]}
        />
      </div>
    );
  }

  resetPassword() {
    this.setState({ passwordForgot: false, displayMessage: true});
    this.props.resetPassword(this.state.email);
  }

  renderButtonText() {
    const { buttonText, isFetching } = this.props;

    if (isFetching) {
      return (
        <Spinner color="white" />
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
        <Input
          required
          value={this.state.passwordConfirm}
          onChange={e => this.setState({ passwordConfirm : e.currentTarget.value})}
          {...confirmPasswordInputProps} 
          invalid={this.state.password !== this.state.passwordConfirm}
        />
        <FormFeedback>Passwörter müssen übereinstimmen</FormFeedback>
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
        <Input
          type="checkbox" 
          onChange={e => this.setState({aggreed: e.currentTarget.checked})}
        />{' '}
        Ich habe die <a href="/datenschutz" target="_blank">Datenschutzerklärung</a> gelesen und akzeptiere sie.
        </Label>
      </FormGroup>
      </div>
    )
  }

  isInputViable() {
    if (this.isLogin) {
      return this.state.email !== ''
        && this.state.password !== ''
    } else {
      return this.validateEmail(this.state.email)
        && this.state.password !== ''
        && this.state.passwordConfirm !== ''
        && this.state.password.length > 7
        && this.state.password === this.state.passwordConfirm
        && this.state.aggreed
        && this.state.birthday !== ''
        && this.state.city !== ''
        && this.state.councilID !== 0
        && this.state.sex !== ''
        && this.state.street !== ''
        && this.state.surname !== ''
        && this.state.name !== ''
        && this.state.zipcode !== ''
    }
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
      conferenceId
    } = this.props;
    if ((this.props.user || this.state.user) && conferenceId) {
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
            invalid={this.state.email !== '' && !this.validateEmail(this.state.email)} 
          />
          <FormFeedback>Ungültige E-Mail-Addresse</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input 
           value={this.state.password}
           onChange={password => this.setState({ password: password.target.value})}
          {...passwordInputProps}
          invalid={this.state.password !== '' && this.state.password.length < 8}
          />
          <FormFeedback>Passwort muss mindestens 8 Zeichen enthalten</FormFeedback>
        </FormGroup>
        {!this.isSignup && <MDButton variant="outlined" onClick={() => this.setState({ passwordForgot: true})}>Passwort vergessen?</MDButton>}
        { this.renderPasswordForgot()}
        {this.isSignup && this.renderSignup()}
        <hr />
        { error && <Alert color="danger">{ this.isLogin ? 'Ungültiger Login' : 'Registrierung fehlerhaft. Das könnte daran liegen, dass die E-Mail-Adresse bereits verwendet wird.'}</Alert>}
        <Button
          disabled={!this.isInputViable()}
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
  usernameLabel: 'Persönliche E-Mail',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Passwort',
  passwordInputProps: {
    type: 'password',
    placeholder: 'Passwort',
  },
  confirmPasswordLabel: 'Passwort bestätigen',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'Passwort wiederholen',
  },
  councilLabel: 'Fachschaftsrat',
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
    conferenceId: state.conference.conferenceId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, remeberMe) => dispatch(AuthActions.login(email, password, remeberMe)),
    registerUser: (params) => dispatch(AuthActions.registerUser(params)),
    getCouncil: () => dispatch(CouncilActions.getCouncil()),
    getCouncilList: () => dispatch(CouncilActions.getCouncilList()),
    resetPassword: (email) => dispatch(AuthActions.resetPassword(email)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
