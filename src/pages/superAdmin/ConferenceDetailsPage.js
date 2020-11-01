import Page from '../../components/Page'
import React from 'react';
import { connect } from 'react-redux'
import {
    Card,
    CardBody,
    Row,
    Col,
    Alert,
} from 'reactstrap'
import ConferenceActions from '../../redux/conferenceRedux';
import CouncilActions from '../../redux/councilRedux';
import PageSpinner from '../../components/PageSpinner';
import DetailsHeader from '../../components/DetailsHeader'
import DetailsBody from '../../components/DetailsBody'
import { Redirect } from 'react-router-dom';
import Delete from '../../components/Delete';
import { shouldObjectBeUpdated, isValidJsonString } from '../../utils/functions';

const emptyConference = {
    name: '',
    dateStart: '',
    dateEnd: '',
    conferenceApplicationPhase: false,
    workshopApplicationPhase: false,
    workshopSuggestionPhase: false,
    attendeeCost: "0",
    alumnusCost: "0",
    addFields: '{}',
    invalid: false,
}

class ConferenceDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            workshop: null,
            redirect: false,
            councilLoaded: false,
            conferenceProperties: [
                { name: 'Name', type: 'text', id: 'name', md: 6, xs: 12},
                { name: 'Start', type: 'date', max: '2100-12-31T23:59', id: 'dateStart', md: 6, xs: 12},
                { name: 'End', type: 'date', max: '2100-12-31T23:59', id: 'dateEnd', md: 6, xs: 12},
                { name: 'Anmeldung zur Konferenz', type: 'select', id: 'conferenceApplicationPhase', options: [
                    { value: false, name: 'geschlossen'},
                    { value: true, name: 'offen'},
                ], md: 12, xs: 12},
                { name: 'Workshop-Anmeldung', type: 'select', id: 'workshopApplicationPhase', options: [
                    { value: false, name: 'geschlossen'},
                    { value: true, name: 'offen'},
                ], md: 12, xs: 12},
                { name: 'Workshopvorschlag einreichen', type: 'select', id: 'workshopSuggestionPhase', options: [
                    { value: false, name: 'geschlossen'},
                    { value: true, name: 'offen'},
                ], md: 12, xs: 12},
                { name: 'Teilnehmerkosten', type: 'text', id: 'attendeeCost', md: 6, xs: 12},
                { name: 'Alumnuskosten', type: 'text', id: 'alumnusCost', md: 6, xs: 12},
                { name: 'Weitere Felder', type: 'json', id: 'addFields', md: 12, xs: 12, xl: 12},
            ]
        }
    }

    componentDidMount() {
        if (this.props.empty) {
            this.setState({ conference: emptyConference, editing: true})
        } else {
            const { id } = this.props.match.params
            this.props.getTempConference(id)
        }

        if (!this.props.councilList || this.props.councilList.length === 0) {
            this.props.getCouncilList()
        }
    }

    componentDidUpdate() {
        if(shouldObjectBeUpdated(this.state.conference, this.props.conference, this.state.editing)) {
            this.setState({ conference: this.props.conference})
        }

        if (!this.state.councilLoaded && this.props.councilList.length > 0) {
            this.updateCouncilList() 
        }
        
    }

    componentWillUnmount() {
        this.props.clearFetching()
        this.props.clearSuccess()
    }

    updateCouncilList() {
        var councilList = [];
        this.props.councilList.forEach(cl => {
          councilList.push({value: cl.councilID ,label: cl.name + ", " + cl.university})
        })
        this.setState({ councilLoaded: true, conferenceProperties: [{name: 'Fachschaftsrat', type: 'react-select', id: 'councilID', options: councilList}, ...this.state.conferenceProperties]})
      }

    isConferenceValid() {
        const { name, dateStart, dateEnd, addFields, councilID} = this.state.conference
        return name && dateStart && dateEnd && councilID && isValidJsonString(addFields)
    }

    onSave() {
        this.props.updateExistingConference(this.state.conference)
        this.setState({ editing: false })
        const { id } = this.props.match.params
        this.props.getTempConference(id)
    }

    onDelete() {
        alert("Das Löschen von Konferenzen wird zur Zeit nicht unterstützt. Bitte wende dich an einen Administrator.")
    }

    render() {
        const { empty, error, success } = this.props;
        const { conference, editing, redirect, councilLoaded } = this.state;

        return (
            <Page
                className="ConferenceDetailsPage"
                title={ empty ? 'Neue Konferenz erstellen' : 'Konferenz-Details'}
            >
                <Row>
                    <Col>
                        <Card>
                            { ((success && empty ) || redirect) && <Redirect to="/conference"/>}
                            { (!conference || !councilLoaded) && !error && <CardBody><PageSpinner /></CardBody>}
                            { error && <CardBody><Alert color="danger">Keine Konferenz mit dieser ID gefunden</Alert></CardBody>}
                            { conference && councilLoaded &&
                                <div>
                                    <DetailsHeader
                                        title={empty ? 'Neue Konferenz' : conference.name}
                                        empty={empty}
                                        onCreate={() => this.props.createNewConference(conference)}
                                        editing={editing}
                                        onEdit={() => this.setState({ editing: true})}
                                        onCancel={() => this.setState({ editing: false, conference: this.props.conference})}
                                        onSave={() => this.onSave()}
                                        disabled={!this.isConferenceValid()}
                                    />
                                    <DetailsBody
                                        disabled={!editing}
                                        object={conference}
                                        onChange={(id, value) => this.setState({ conference: {...conference, [id]: value}})}
                                        properties={this.state.conferenceProperties}
                                    />
                                    <Delete 
                                        show={editing && !empty}
                                        onDelete={() => this.onDelete()}
                                        type="die Konferenz"
                                        name={conference.name}
                                    />
                                </div>
                            }
                        </Card>
                    </Col>
                </Row>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        conference: state.conference.tempConference,
        fetching: state.conference.fetching,
        error: state.conference.error,
        success: state.conference.success,
        councilList: state.council.councilList,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getCouncilList: () => dispatch(CouncilActions.getCouncilList()),
        getTempConference: (conferenceId) => dispatch(ConferenceActions.getTempConference(conferenceId)),
        createNewConference: (conference) => dispatch(ConferenceActions.createNewConference(conference)),
        updateExistingConference: (conference) => dispatch(ConferenceActions.updateExistingConference(conference)),
        clearFetching: () => dispatch(ConferenceActions.updateConferenceFetching(false)),
        clearSuccess: () => dispatch(ConferenceActions.updateConferenceSuccess(false)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ConferenceDetailsPage);