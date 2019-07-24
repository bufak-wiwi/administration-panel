import React from 'react';
import { Input, FormGroup, Label, Card, CardBody, Button, Alert, Spinner } from 'reactstrap';
import { connect } from 'react-redux'
import ConferenceActions from '../redux/conferenceRedux';

class PasswordProtection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: ''
        }
    }

    render() {
        const { fetching, error } = this.props;
        return (
            <Card>
                <CardBody>
                    <FormGroup>
                        <Label for="password">Password deiner Fachschaft:</Label>
                        <Input type="password" onChange={e => this.setState({ password: e.currentTarget.value})} />
                    </FormGroup>
                    { error && <Alert color="danger">Password fehlerhaft oder ungültig.</Alert>}
                    <FormGroup>
                        <Button disabled={fetching} onClick={() => this.props.checkPassword(this.state.password)}>
                            { fetching && <Spinner />}
                            { !fetching && 'Password überprüfen'}
                        </Button>
                    </FormGroup>
                </CardBody>
          </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        conferenceId: state.conference.conferenceId,
        user: state.auth.user,
        fetching: state.conference.fetching,
        error: state.conference.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkPassword: (password) => dispatch(ConferenceActions.checkPassword(password))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(PasswordProtection);
