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
            redirect: false,
            workshopProperties: [
                { name: 'Name*', type: 'text', id: 'name', xl: 12, md: 12, xs: 12},
                { name: 'Name abgekürzt*', type: 'text', id: 'nameShort', md: 6, xs: 12},
                { name: 'Workshopleiter', type: 'text', id: 'hostName', md: 6, xs: 12, readOnly: true},
                { name: 'Beschreibung*', type: 'textarea', id: 'overview', md: 12, xs: 12, xl: 12},
                { name: 'Niveau*', type: 'select', id: 'difficulty', options: [
                    { value: 'Basic', name: 'Basic'},
                    { value: 'Fortgeschritten', name: 'Fortgeschritten'},
                    { value: 'Profi', name: 'Profi'}
                ], md: 3, xs: 12, xl: 3},
                { name: 'Themenbereich', type: 'text', id: 'topic', md: 3, xs: 12, xl: 3},
                { name: 'Dauer (min)', type: 'number', id: 'duration', md: 3, xs: 12, xl: 3},
                { name: 'Maximale Besucherzahl', type: 'number', id: 'maxVisitors', min: 0, max: 999, md: 3, xs: 12, xl: 3},
                { name: 'Anmerkungen (z.B. Material, weitere Workshopleiter)', type: 'textarea', id: 'materialNote', md: 12, xs: 12, xl: 12}
            ]
        }
    }

    componentDidMount() {
        const { user } = this.props;
        let {conference}  = this.props;

        const getWorkshopTopics = () => (conference.workshopTopics || "").split(",") || "default"
        const getWorkshopDurations = () => (conference.workshopDurations || "").split(",") || "90"

        if(conference){
            this.setState({
                workshop: {...this.state.workshop, hostUID: user.uid, hostName: `${user.name} ${user.surname}`, topic: getWorkshopTopics()[0], duration: getWorkshopDurations()[0]},
                workshopProperties:[
                        { name: 'Name*', type: 'text', id: 'name', xl: 12, md: 12, xs: 12},
                        { name: 'Name abgekürzt*', type: 'text', id: 'nameShort', md: 6, xs: 12},
                        { name: 'Workshopleiter', type: 'text', id: 'hostName', md: 6, xs: 12, readOnly: true},
                        { name: 'Beschreibung*', type: 'textarea', id: 'overview', md: 12, xs: 12, xl: 12},
                        { name: 'Niveau*', type: 'select', id: 'difficulty', options: [
                            { value: 'Basic', name: 'Basic'},
                            { value: 'Fortgeschritten', name: 'Fortgeschritten'},
                            { value: 'Profi', name: 'Profi'}
                        ], md: 3, xs: 12, xl: 3},
                        { name: 'Themenbereich*', type: 'select', id: 'topic', xs: 12, md:3,xl:3, options: [
                            ...getWorkshopTopics().map(option => ({ value: option, name: option}))
                          ]},
                        { name: 'Dauer (min)*', type: 'select', id: 'duration', xs: 12, md:3,xl:3, options: [
                            ...getWorkshopDurations().map(option => ({ value: option, name: option}))
                          ]},
                        { name: 'Maximale Besucherzahl*', type: 'number', id: 'maxVisitors', min: 0, max: 999, md: 3, xs: 12, xl: 3},
                        { name: 'Anmerkungen (z.B. Material, weitere Workshopleiter)', type: 'textarea', id: 'materialNote', md: 12, xs: 12, xl: 12}
                    ]
            })
        } else{
            this.setState({
                workshop: {...this.state.workshop, hostUID: user.uid, hostName: `${user.name} ${user.surname}`}
        
            })
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
            return (
                <PageSpinner />
            )
        }

        if (this.props.conference.informationTextWorkshopSuggestion !== undefined){
            return (
                <Page
                    className="WorkshopDetailsPage"
                >
                    <Row>
                        <Col>
                            <Card>
                                { (redirect || success) && <Redirect to="/"/>}
                                { redirect && error &&<CardBody><Alert color="danger"/>Das hat leider nicht geklappt. Versuche es später noch einmal oder melde dich beim Ausrichter.</CardBody>}
                                { redirect && !error && !success && <CardBody><PageSpinner /></CardBody>}
                                { !redirect &&
                                    <div>

                                        <DetailsHeader
                                            title={'Neuen Workshop einreichen'}
                                            empty={true}
                                            onCreate={() => this.props.createNewWorkshopSuggestion(workshop)}
                                            editing={true}
                                            onSave={() => this.onSave()}
                                            disabled={!this.isWorkshopValid()}
                                        />

                                        <div style={{padding:'1.25rem'}}>
                                            <h6>Hinweise des Ausrichters:</h6>
                                            <div dangerouslySetInnerHTML={{ __html: this.props.conference.informationTextWorkshopSuggestion }} />
                                        </div>
                                        <DetailsBody
                                            disabled={false}
                                            object={workshop}
                                            onChange={(id, value) => this.setState({ workshop: {...workshop, [id]: value}})}
                                            properties={this.state.workshopProperties}
                                        />
                                    </div>
                                }
                            </Card>
                        </Col>
                    </Row>
                </Page>
            )
        } else {
            return (
                <Page
                    className="WorkshopDetailsPage"
                >
                    <Row>
                        <Col>
                            <Card>
                                { (redirect || success) && <Redirect to="/"/>}
                                { redirect && error &&<CardBody><Alert color="danger"/>Das hat leider nicht geklappt. Versuche es später noch einmal oder melde dich beim Ausrichter.</CardBody>}
                                { redirect && !error && !success && <CardBody><PageSpinner /></CardBody>}
                                { !redirect &&
                                    <div>

                                        <DetailsHeader
                                            title={'Neuen Workshop einreichen'}
                                            empty={true}
                                            onCreate={() => this.props.createNewWorkshopSuggestion(workshop)}
                                            editing={true}
                                            onSave={() => this.onSave()}
                                            disabled={!this.isWorkshopValid()}
                                        />
                                        <DetailsBody
                                            disabled={false}
                                            object={workshop}
                                            onChange={(id, value) => this.setState({ workshop: {...workshop, [id]: value}})}
                                            properties={this.state.workshopProperties}
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
