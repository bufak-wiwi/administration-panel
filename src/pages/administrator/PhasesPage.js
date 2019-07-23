import Page from '../../components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'
import PageSpinner from '../../components/PageSpinner';
import ConferenceActions from '../../redux/conferenceRedux';

const phases = [
    { name: 'Anmeldung zur Konferenz', id:'conferenceApplicationPhase'},
    { name: 'Workshop-Anmeldung', id: 'workshopApplicatonPhase'}
]

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            editing: false,
            conferenceApplicationPhase: false,
            workshopApplicatonPhase: false,
            workshopSuggestionPhase: false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.conference !== this.props.conference) {
            this.savePropsToState()
        }
    }

    onCancelPress() {
        this.setState({
            editing: false
        })
        this.savePropsToState()
    }

    savePropsToState() {
        const { conferenceApplicationPhase, workshopApplicatonPhase, workshopSuggestionPhase } = this.props.conference
        this.setState({
            conferenceApplicationPhase,
            workshopApplicatonPhase,
            workshopSuggestionPhase,
        })
    }

    onSavePress() {
        this.setState({
            editing: false
        })
        const { 
            conferenceApplicationPhase,
            workshopApplicatonPhase,
            workshopSuggestionPhase
        } = this.state;
        this.props.updatePhases({
            conferenceApplicationPhase,
            workshopApplicatonPhase,
            workshopSuggestionPhase
        })
    }

  render() {
    const { conference } = this.props
    if (!conference) {
      return (
        <PageSpinner color="primary" />
      );
    }

    return (
      <Page
        className="PhasesPage"
        title="Konferenz-Einstellungen"
      >
        <Row>
            <Col xs="12">
                <Card>
                    <CardHeader>
                        <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
                            Phasen-Einstellungen
                            <div>
                            { !this.state.editing && <Button onClick={() => this.setState({ editing: true})}>Bearbeiten</Button>}
                            { this.state.editing && <Button onClick={() => this.onCancelPress()}>Abbrechen</Button>}
                            { this.state.editing && <Button style={{marginLeft: 10}} onClick={() => this.onSavePress()}>Speichern</Button>}
                            </div>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        { phases.map(x => {
                            return (
                                <FormGroup key={'formGroup_' + x.id}>
                                    <Label for={x.id}>{x.name}</Label>
                                    <Input 
                                        type="select"
                                        id={x.id}
                                        key={x.id}
                                        disabled={!this.state.editing}
                                        value={this.state[x.id] ? '1' : '0'}
                                        onChange={(e) => this.setState({ [x.id]: e.currentTarget.value === '0' ? false : true})}
                                    >
                                        <option value="0">geschlossen</option>
                                        <option value="1">offen</option>
                                    </Input>
                                </FormGroup>
                            )
                        })}

                    </CardBody>
                </Card>
            </Col>
        </Row>
     </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conference: state.conference.conference,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePhases: (data) => dispatch(ConferenceActions.updatePhases(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
