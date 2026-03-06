import Page from '../components/Page'
import React from 'react';
import { connect } from 'react-redux'
import {
    Card,
    CardBody,
    Row,
    Col,
    Alert,
} from 'reactstrap'
import WorkshopActions from '../redux/workshopRedux'
import PageSpinner from '../components/PageSpinner';
import DetailsHeader from '../components/DetailsHeader'
import DetailsBody from '../components/DetailsBody'
import { Redirect } from 'react-router-dom';

class WorkshopSuggestionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            workshop: {
                name: '',
                nameShort: '',
                overview: '',
                maxVisitors: 45,
                difficulty: 'Basic',
                hostUID: '',
                hostName: '',
                place: '',
                start: '2020-12-31T23:59',
                topic: 'default',
                duration: 90,
                materialNote: ''
            },
            redirect: false
            // workshopProperties wurden aus dem State entfernt, da wir sie dynamisch generieren
        }
    }

    componentDidMount() {
        const { user, conference } = this.props;
        
        let initialTopic = 'default';
        let initialDuration = 90;

        // Falls die Daten beim Mounten schon da sind
        if (conference) {
            const topics = conference.workshopTopics ? conference.workshopTopics.split(",") : ['default'];
            const durations = conference.workshopDurations ? conference.workshopDurations.split(",") : ['90'];
            initialTopic = topics[0];
            initialDuration = durations[0];
        }

        this.setState({
            workshop: {
                ...this.state.workshop, 
                hostUID: user.uid, 
                hostName: `${user.name} ${user.surname}`,
                topic: initialTopic,
                duration: initialDuration
            }
        });
    }

    componentDidUpdate(prevProps) {
        // Falls die Konferenz-Daten erst kurz nach dem Mounten geladen werden
        if (this.props.conference !== prevProps.conference && this.props.conference) {
            const topics = this.props.conference.workshopTopics ? this.props.conference.workshopTopics.split(",") : ['default'];
            const durations = this.props.conference.workshopDurations ? this.props.conference.workshopDurations.split(",") : ['90'];
            
            this.setState(prevState => ({
                workshop: {
                    ...prevState.workshop,
                    topic: prevState.workshop.topic === 'default' ? topics[0] : prevState.workshop.topic,
                    duration: prevState.workshop.duration === 90 ? durations[0] : prevState.workshop.duration
                }
            }));
        }
    }

    componentWillUnmount() {
        this.props.clearFetching()
        this.props.clearSuccess()
    }

    isWorkshopValid() {
        const { name, overview, duration , difficulty, nameShort, maxVisitors} = this.state.workshop
        return name && overview && duration && difficulty && nameShort && maxVisitors
    }

    onSave() {
        this.setState({redirect: true})
        this.props.updateExistingWorkshop(this.state.workshop)
    }

    // Dynamische Berechnung der Eingabefelder
    getWorkshopProperties() {
        const { conference } = this.props;
        const topics = conference && conference.workshopTopics ? conference.workshopTopics.split(",") : [];
        const durations = conference && conference.workshopDurations ? conference.workshopDurations.split(",") : [];

        return [
            { name: 'Workshoptitel*', type: 'text', id: 'name', xl: 12, md: 12, xs: 12},
            { name: 'Workshoptitel kurz*', type: 'text', id: 'nameShort', md: 6, xs: 12},
            { name: 'Workshopleiter', type: 'text', id: 'hostName', md: 6, xs: 12, readOnly: true},
            { name: 'Beschreibung*', type: 'textarea', id: 'overview', md: 12, xs: 12, xl: 12},
            { name: 'Niveau*', type: 'select', id: 'difficulty', options: [
                { value: 'Basic', name: 'Basic'},
                { value: 'Fortgeschritten', name: 'Fortgeschritten'},
                { value: 'Profi', name: 'Profi'}
            ], md: 3, xs: 12, xl: 3},
            { name: 'Themenbereich*', type: 'select', id: 'topic', xs: 12, md: 3, xl: 3, options: topics.map(t => ({ value: t, name: t})) },
            { name: 'Dauer (min)*', type: 'select', id: 'duration', xs: 12, md: 3, xl: 3, options: durations.map(d => ({ value: d, name: d})) },
            { name: 'Maximale Besucherzahl*', type: 'number', id: 'maxVisitors', min: 0, max: 999, md: 3, xs: 12, xl: 3},
            { name: 'Anmerkungen (z.B. Material, weitere Workshopleiter)', type: 'textarea', id: 'materialNote', md: 12, xs: 12, xl: 12}
        ];
    }

    render() {
        const { error, success, conference, fetching } = this.props;
        const { workshop, redirect } = this.state;
        
        if (!conference || !conference.workshopSuggestionPhase) {
            return (
                <Page className="WorkshopDetailsPage">
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Alert color="danger">Momentan können keine Workshops eingereicht werden.</Alert>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Page>
            )
        }

        if (fetching) {
            return <PageSpinner />
        }

        // Ruft die aktuellen Eigenschaften ab
        const currentProperties = this.getWorkshopProperties();

        return (
            <Page className="WorkshopDetailsPage">
                <Row>
                    <Col>
                        <Card>
                            { (redirect || success) && <Redirect to="/"/>}
                            { redirect && error && <CardBody><Alert color="danger"/>Das hat leider nicht geklappt. Versuche es später noch einmal oder melde dich beim Ausrichter.</CardBody>}
                            { redirect && !error && !success && <CardBody><PageSpinner /></CardBody>}
                            
                            { !redirect && (
                                <div>
                                    <DetailsHeader
                                        title={'Neuen Workshop einreichen'}
                                        empty={true}
                                        onCreate={() => this.props.createNewWorkshopSuggestion(workshop)}
                                        editing={true}
                                        onSave={() => this.onSave()}
                                        disabled={!this.isWorkshopValid()}
                                    />

                                    { conference.informationTextWorkshopSuggestion !== undefined && (
                                        <div style={{padding:'1.25rem'}}>
                                            <h6>Hinweise des Ausrichters:</h6>
                                            <div dangerouslySetInnerHTML={{ __html: conference.informationTextWorkshopSuggestion }} />
                                        </div>
                                    )}

                                    <DetailsBody
                                        disabled={false}
                                        object={workshop}
                                        onChange={(id, value) => this.setState({ workshop: {...workshop, [id]: value}})}
                                        properties={currentProperties}
                                    />
                                </div>
                            )}
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
        error: state.workshop.error,
        users: state.workshop.users,
        success: state.workshop.success,
        fetching: state.workshop.fetching,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(WorkshopActions.getUsers()),
        createNewWorkshopSuggestion: (workshop) => dispatch(WorkshopActions.createNewWorkshopSuggestion(workshop)),
        clearFetching: () => dispatch(WorkshopActions.updateFetching(false)),
        clearSuccess: () => dispatch(WorkshopActions.updateSuccess(false)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopSuggestionPage);
