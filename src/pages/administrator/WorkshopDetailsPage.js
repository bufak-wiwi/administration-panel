import Page from '../../components/Page'
import React from 'react';
import { connect } from 'react-redux'
import {
    Card,
    CardBody,
    Row,
    Col,
    FormGroup,
    Label,
    Alert
} from 'reactstrap'
import CreatableSelect from 'react-select/creatable';
import WorkshopActions from '../../redux/workshopRedux'
import PageSpinner from '../../components/PageSpinner';
import DetailsHeader from '../../components/DetailsHeader'
import DetailsBody from '../../components/DetailsBody'
import { Redirect } from 'react-router-dom';

const emptyWorkshop = {
    name: '',
    nameShort: '',
    overview: '',
    maxVisitors: 45,
    difficulty: 'Basic',
    hostUID: '',
    hostName: '',
    place: '',
    start: '',
    duration: 90,
    materialNote: ''
}

class WorkshopDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            workshop: null,
            workshopProperties: [
                { name: 'Name*', type: 'text', id: 'name', md: 6, xs: 12},
                { name: 'Name Abgekürzt', type: 'text', id: 'nameShort', md: 6, xs: 12},
                { name: 'Beschreibung', type: 'textarea', id: 'overview', md: 12, xs: 12},
                { name: 'Workshopleiter', type: 'text', id: 'hostName', md: 6, xs: 12},
                { name: 'Niveau*', type: 'select', id: 'difficulty', options: [
                    { value: 'Basic', name: 'Basic'},
                    { value: 'Fortgeschritten', name: 'Fortgeschritten'},
                    { value: 'Profi', name: 'Profi'}
                ], md: 6, xs: 12},
                { name: 'Startzeitpunkt*', type: 'datetime-local', id: 'start', md: 6, xs: 12},
                { name: 'Dauer (min)*', type: 'number', id: 'duration', md: 6, xs: 12},
                { name: 'Maximale Besucher', type: 'number', id: 'maxVisitors', min: 0, max: 999, md: 6, xs: 12},
                { name: 'Raum', type: 'text', id: 'place', md: 6, xs: 12},
                { name: 'Anmerkungen (z.B. Material)', type: 'textarea', id: 'materialNote', md: 12, xs: 12}
            ]
        }
    }
    renderHostSelect() {
        // TODO

        return (
            <FormGroup>
                <Label for="select">Workshopleiter</Label>
                <CreatableSelect
                    isClearable
                    onChange={val => console.log('selected', val)}
                    onInputChange={(e) => console.log(e)}
                    options={this.props.users}
                />
            </FormGroup>
        )
    }

    componentDidMount() {
        // if (!this.props.users || this.props.users.length === 0) {
        //     this.props.getUsers();
        // }
        if (this.props.empty) {
            this.setState({ workshop: emptyWorkshop, editing: true})
        } else {
            const { id } = this.props.match.params
            this.props.getWorkshop(id)
        }
    }

    componentDidUpdate() {
        if(this.props.workshop && this.state.workshop === null) {
            this.setState({ workshop: this.props.workshop})
        }
    }

    componentWillUnmount() {
        this.props.clearFetching()
        this.props.clearSuccess()
    }

    isWorkshopValid() {
        const { name, start, duration , difficulty} = this.state.workshop
        return name && start && duration && difficulty
    }

    onSave() {
        this.props.updateExistingWorkshop(this.state.workshop)
        this.setState({ editing: false })
        const { id } = this.props.match.params
        this.props.getWorkshop(id)
    }


    render() {
        const { empty, error, success } = this.props;
        const { workshop, editing } = this.state;

        return (
            <Page
                className="WorkshopDetailsPage"
                title={ empty ? 'Neuen Workshop erstellen' : 'Workshop-Details'}
            >
                <Row>
                    <Col>
                        <Card>
                            { success && empty && <CardBody><Redirect to="/workshops"/></CardBody>}
                            { !workshop && !error && <CardBody><PageSpinner /></CardBody>}
                            { error && <CardBody><Alert color="danger">Kein Workshop mit dieser ID gefunden</Alert></CardBody>}
                            { workshop && 
                                <div>
                                    <DetailsHeader
                                        title={empty ? 'Neuer Workshop' : workshop.name}
                                        empty={empty}
                                        onCreate={() => this.props.createNewWorkshop(workshop)}
                                        editing={editing}
                                        onEdit={() => this.setState({ editing: true})}
                                        onCancel={() => this.setState({ editing: false, workshop: this.props.workshop})}
                                        onSave={() => this.onSave()}
                                        disabled={!this.isWorkshopValid()}
                                    />
                                    <DetailsBody
                                        disabled={!editing}
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

const mapStateToProps = (state) => {
    return {
        workshop: state.workshop.workshop,
        error: state.workshop.error,
        users: state.workshop.users,
        success: state.workshop.success,
        fetching: state.workshop.fetching,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getWorkshop: (id) => dispatch(WorkshopActions.getWorkshop(id)),
        getUsers: () => dispatch(WorkshopActions.getUsers()),
        createNewWorkshop: (workshop) => dispatch(WorkshopActions.createNewWorkshop(workshop)),
        updateExistingWorkshop: (workshop) => dispatch(WorkshopActions.updateExistingWorkshop(workshop)),
        clearFetching: () => dispatch(WorkshopActions.updateFetching(false)),
        clearSuccess: () => dispatch(WorkshopActions.updateSuccess(false)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(WorkshopDetailsPage);