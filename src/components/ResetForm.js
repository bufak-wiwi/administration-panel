import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    CardBody,
    Button,
    Col,
    Row,
    FormGroup,
    Input,
    Label,
    Alert,
    FormFeedback,
} from 'reactstrap'
import { Divider, Dialog, Slide, DialogTitle, DialogContent, DialogActions, } from '@material-ui/core';
import AuthActions from '../redux/authRedux'
import PageSpinner from './PageSpinner';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class ResetForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            email: true,
            newEmail: '',
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        }
    }

    renderResetEmail() {
        return (
            <div>
                <FormGroup>
                    <Label for="emailChange">Neue E-Mail-Adresse</Label>
                    <Input 
                        type="email"
                        id="emailChange"
                        value={this.state.newEmail}
                        onChange={e => this.setState({newEmail: e.currentTarget.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="passwordChange">Passwort</Label>
                    <Input 
                        type="password"
                        id="passwordChange"
                        value={this.state.oldPassword}
                        onChange={e => this.setState({oldPassword: e.currentTarget.value})}
                    />
                </FormGroup>
            </div>
        )
    }

    renderResetPassword() {
        const { oldPassword, newPassword, newPasswordConfirm } = this.state
        return (
            <div>
                <FormGroup>
                    <Label for="oldPasswordChange">Altes Passwort</Label>
                    <Input 
                        type="password"
                        id="oldPasswordChange"
                        value={oldPassword}
                        onChange={e => this.setState({oldPassword: e.currentTarget.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="newPassword">Neues Passwort</Label>
                    <Input 
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        invalid={newPassword.length < 8}
                        onChange={e => this.setState({newPassword: e.currentTarget.value})}
                    />
                    <FormFeedback>min. 8 Zeichen</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="passwordConfirm">Passwort bestätigen</Label>
                    <Input 
                        type="password"
                        id="passwordConfirm"
                        value={newPasswordConfirm}
                        invalid={newPassword !== newPasswordConfirm}
                        onChange={e => this.setState({newPasswordConfirm: e.currentTarget.value})}
                    />
                    <FormFeedback>Passwörter stimmen nicht überein</FormFeedback>
                </FormGroup>
            </div>
        )
    }

    renderResetDialog() {
        const { fetching, error, success } = this.props
        const { isOpen, email, newEmail, oldPassword, newPassword, newPasswordConfirm } = this.state
        return (
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => this.setState({ isOpen: false})}
                aria-labelledby="title"
                aria-describedby="description"
                style={{minWidth: 100}}
            >
                <DialogTitle id="title">{ email ? 'E-Mail-Adresse ändern' : 'Passwort ändern'}</DialogTitle>
                <DialogContent>
                    { fetching && <PageSpinner />}
                    { error && <Alert color="danger">Hier lief etwas schief!</Alert>}
                    { success && <Alert color="success">Änderung erfolgreich</Alert>}
                    { email && !fetching && this.renderResetEmail() }
                    { !email && !fetching && this.renderResetPassword() }
                </DialogContent>
                { !fetching && 
                    <DialogActions>
                        <Button outline onClick={() => this.setState({ isOpen: false})} color="primary">Abbrechen</Button>
                        <Button outline
                            disabled={(email && newEmail === '') || (!email && newPassword.length < 8 && newPasswordConfirm !== newPassword )}
                            onClick={ () => 
                                this.state.email ? this.props.changeEmail(this.state.newEmail, this.state.oldPassword) 
                                : this.props.changePassword(oldPassword, newPassword)
                            } 
                            color="danger"
                        >Ändern</Button>
                    </DialogActions>
                }
            </Dialog>
        )
    }

    render() {
        const { 
            dividerTop = true,
            dividerBottom = false,
            disabled = false,
            show = true,
            fetching,
        } = this.props;
        if (!show) {
            return null;
        }

        return (
            <div>
                { dividerTop && <Divider />}
                <CardBody>
                    <Row>
                        <Col xs="12" sm="6">
                            <Button
                                block
                                disabled={disabled || fetching}
                                onClick={() => this.setState({ isOpen: true, email: true})}
                            >
                                E-Mail-Adresse ändern
                            </Button>
                        </Col>
                        <Col xs="12" sm="6">
                            <Button
                                block
                                disabled={disabled || fetching}
                                onClick={() => this.setState({ isOpen: true, email: false})}
                            >
                                Passwort ändern
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
                { dividerBottom && <Divider />}
                { this.renderResetDialog() }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        fetching: state.auth.fetching,
        error: state.auth.error,
        success: state.auth.success,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeEmail: (newEmail, oldPassword) => dispatch(AuthActions.changeEmail(newEmail, oldPassword)),
        changePassword: (oldPassword, newPassword) => dispatch(AuthActions.changePassword(oldPassword, newPassword)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetForm);