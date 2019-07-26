import Page from '../../components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  Table,
  Button,
} from 'reactstrap'
import PageSpinner from '../../components/PageSpinner';
import ConferenceActions from '../../redux/conferenceRedux';
import CouncilActions from '../../redux/councilRedux'
import SearchInput from '../../components/SearchInput';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const priorities = [
    {name: '1', id: 'priority', value: 1},
    {name: '2', id: 'priority', value: 2},
    {name: '3', id: 'priority', value: 3},
    {name: '4', id: 'priority', value: 4},
    {name: '5', id: 'priority', value: 5},
    {name: '6', id: 'priority', value: 6},
    {name: 'Alumnus', id: 'isAlumnus', value: true},
    {name: 'BuFaK Rat', id: 'isBuFaKCouncil', value: true},
    {name: 'Helfer', id: 'isHelper',  value: true},
]

class ApplicationListPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            search: '',
            selectedPriority: '',
            selectedStatus: '',
            isOpen: false,
            isChangeClicked: false,
        }
    }

    componentDidMount() {
        this.props.getApplicationList()
        this.props.getCouncilList()
    }

    getFilteredApplicationsList() {
        const search = this.state.search.toLowerCase().trim()
        const prio = priorities.find(x => x.name === this.state.selectedPriority)
        return this.props.applicationList
            .filter(x => !x.isInvalid) // neccessary?
            .filter(x => !prio || x[prio.id] === prio.value)
            .filter(x => !this.state.selectedStatus || x.status === this.state.selectedStatus)
            .filter(x => `${x.user.name} ${x.user.surname}`.toLowerCase().includes(search)
                || x.user.email.toLowerCase().includes(search)
                || (x.note && x.note.toLowerCase().includes(search))
                || (x.hotel && x.hotel.toLowerCase().includes(search))
                || (x.room && x.room.toLowerCase().includes(search))
                || this.isSearchInCouncil(x.user.councilID)
            )
    }

    isSearchInCouncil(councilId) {
        const council = this.props.councilList.find(x => x.councilID === councilId)
        const search = this.state.search.toLowerCase().trim()
        if(!council) {
            return false
        }
        return council.city.toLowerCase().includes(search)
            || council.university.toLowerCase().includes(search)
            || council.name.toLowerCase().includes(search)
    }

    getCouncilName(councilId) {
        const council = this.props.councilList.find(x => x.councilID === councilId)
        return council ? council.name : councilId
    }

    getCouncilUniversity(councilId) {
        const council = this.props.councilList.find(x => x.councilID === councilId)
        return council ? council.university : 'unbekannt'
    }

    getPriorityOrType(x) {
        if (x.isAlumnus) {
            return 'Alumnus'
        }
        if (x.isHelper) {
            return 'Helfer'
        }
        if (x.isBuFaKCouncil) {
            return 'BuFaK Rat'
        }
        return x.priority
    }

    getStatus(x) {
       switch(x.status) {
           case 'HasApplied':
               return 'ausstehend'
            case 'IsRejected':
                return 'abgelehnt'
            case 'IsAttendee':
                return 'angenommen'
            default:
                return 'unbekannt'
       } 
    }

    getStatusIndex(x) {
        switch(x) {
            case 'HasApplied':
                return 0
             case 'IsRejected':
                 return 1
             case 'IsAttendee':
                 return 2
             default:
                 return 0
        } 
    }

    changeApplicationStatus(status) {
        this.setState({ isOpen: false})
        const changedApplications = []
        const filteredApplications = this.getFilteredApplicationsList()

        filteredApplications.forEach(x => changedApplications.push(x.applicantUID))
        this.props.uploadApplicationStatusChange({
            uiDs: changedApplications,
            newStatus: this.getStatusIndex(status)
        })
    }

    renderDialog() {
        const filteredApplications = this.getFilteredApplicationsList()
        const { isChangeClicked } = this.state
        return(
            <Dialog open={this.state.isOpen} onClose={() => this.setState({ isOpen: false, isChangeClicked: false })}>
                <DialogTitle>Status ändern</DialogTitle>
                <DialogContent>
                    { !isChangeClicked && (
                        <div>
                            <DialogContentText>In diesem Dialog kannst du den Status von mehreren Anmeldungen abhängig von den Filtern und der Suche gleichzeitig ändern.</DialogContentText>
                            <DialogContentText>Anmeldungen betroffen insgesamt: <b>{ filteredApplications.length }</b><br />
                                <b>{filteredApplications.filter(x => x.status === 'HasApplied').length}</b> ausstehend<br />
                                <b>{filteredApplications.filter(x => x.status === 'IsAttendee').length}</b> angenommen<br />
                                <b>{filteredApplications.filter(x => x.status === 'IsRejected').length}</b> abgelehnt<br />
                            </DialogContentText>
                        </div>
                    )}
                    { isChangeClicked && <DialogContentText>Wie sollen die ausgewählten Anmeldungen geändert werden?</DialogContentText>}
                    { isChangeClicked && <DialogActions>
                        <Row style={{justifyContent: 'center', flex: 1}}>
                            <Button color="success" style={{ margin: 10}}onClick={() => this.changeApplicationStatus('IsAttendee')}>Annehmen</Button>
                            <Button color="danger" style={{ margin: 10}} onClick={() => this.changeApplicationStatus('IsRejected')}>Ablehnen</Button>
                            <Button color="primary" style={{ margin: 10}}onClick={() => this.changeApplicationStatus('HasApplied')}>Zurücksetzen</Button>
                        </Row>
                    </DialogActions>}
                    <DialogActions>
                        <Row>
                            <Button color="grey" onClick={() => this.setState({ isOpen: false, isChangeClicked: false })}>Abbrechen</Button>
                            { !isChangeClicked && <Button onClick={() => this.setState({ isChangeClicked: true})}>Ändern</Button> }
                        </Row>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }

    renderChangeDialog() {
        return (
            <Dialog open={this.state.isChangeOpen} onClose={() => this.setState({ isChangeOpen: false})}>
            <DialogTitle>Status ändern - bestätigen</DialogTitle>
            <DialogContent>
                <DialogContentText>Wie sollen die ausgewählten Anmeldungen geändert werden</DialogContentText>
                <DialogActions>
                    <Button  color="grey" onClick={() => this.setState({ isChangeOpen: false})}>Abbrechen</Button>
                    <Button color="success" onClick={() => alert('annehmen')}>Annehmen</Button>
                    <Button color="danger" onClick={() => alert('ablehnen')}>Ablehnen</Button>
                    <Button color="secondary" onClick={() => alert('zurücksetzen')}>Zurücksetzen</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
        )
    }

  render() {
    const { applicationList, councilList } = this.props
    if (!applicationList || !councilList) {
      return (
        <PageSpinner color="primary" />
      );
    }
    return (
      <Page
        className="ApplicationListPage"
        title="Anmeldungsübersicht"
      >
        <Row>
            <Col>
            <Card>
                <CardHeader>
                    <Row>
                        <Col xs ="12" md="2">
                            <Input
                                type="select"
                                name="priority"
                                id="priority"
                                value={ this.state.selectedPriority }
                                onChange={e => this.setState({ selectedPriority: e.target.value })}
                                >
                                    <option value=''>Jede Priorität</option>
                                    { priorities.map(prio => 
                                        <option key={prio.name}>{prio.name}</option>
                                    )}
                                </Input>
                        </Col>
                        <Col xs="12" md="2">
                            <Input
                                type="select"
                                name="status"
                                id="status"
                                value={ this.state.selectedStatus }
                                onChange={e => this.setState({ selectedStatus: e.target.value })}
                            >
                                <option value=''>Jeder Status</option>
                                <option value='HasApplied'>ausstehend</option>
                                <option value='IsAttendee'>angenommen</option>
                                <option value='IsRejected'>abgelehnt</option>
                            </Input>
                        </Col>
                        <Col xs="12" md="2">
                            <Button onClick={() => this.setState({ isOpen: true})}>Status ändern</Button>
                            { this.renderDialog() }
                        </Col>
                        <Col xs="12" md="3">
                            <SearchInput onChange={(e) => this.setState({ search: e.currentTarget.value})} />
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Table responsive borderd="true" striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Fachschaft</th>
                            <th>Hochschule</th>
                            <th>Priorität</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.getFilteredApplicationsList().map((x, i) => {
                            return (
                                <tr key={x.applicantUID} onClick={() => this.props.history.push('/application/' + x.applicantUID)}>
                                    <th scope="row">{i+1}</th>
                                    <td>{ `${x.user.surname} ${x.user.name}` }</td>
                                    <td>{ this.getCouncilName(x.user.councilID) }</td>
                                    <td>{ this.getCouncilUniversity(x.user.councilID)}</td>
                                    <td>{ this.getPriorityOrType(x) }</td>
                                    <td>{ this.getStatus(x) }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </Table>
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
    applicationList: state.conference.applicationList,
    councilList: state.council.councilList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getApplicationList: () => dispatch(ConferenceActions.getApplicationList()),
    getCouncilList: () => dispatch(CouncilActions.getCouncilList()),
    uploadApplicationStatusChange: (data) => dispatch(ConferenceActions.uploadApplicationStatusChange(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationListPage);
