import Page from '../../components/Page'
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Table,
  Button,
  Input
} from 'reactstrap'
import Delay from '../../components/Delay'
import WorkshopActions from '../../redux/workshopRedux'
import SearchInput from '../../components/SearchInput';
import {Link} from 'react-router-dom';
import {
    FaPlus
  } from 'react-icons/fa';
import moment from 'moment';
import Empty from '../../components/Empty';
require('moment/locale/de.js')



class WorkshopListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            selectedStart: '',
            isOpen: false,
        }
    }

    componentDidMount() {
        this.props.getWorkshopList();
    }


    renderList() {
        return (
            <Table responsive borderd="true" striped hover>
                <thead><tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Leiter</th>
                    <th>Zeitpunkt</th>
                    <th>Teilnehmer</th>    
                    <th>Raum</th> 
                    <th>Anmerkung (z.B. Material)</th>
                </tr></thead>
                <tbody>
                    { this.getFilteredWorkshopList().map((x, i) => 
                        <tr key={x.workshopID} onClick={() => this.props.history.push('/workshop-list/' + x.workshopID)}>
                            <th scope="row">{i+1}</th>
                            <td>{x.name}</td>
                            <td>{x.hostName}</td>
                            <td>{moment(x.start).format('dddd HH:mm') + ' Uhr'}</td>
                            <td>{`${x.applicants}/${x.maxVisitors}`}</td>
                            <td>{x.place || 'tba'}</td>
                            <td>{x.materialNote}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }

    getFilteredWorkshopList() {
        const search = this.state.search.toLowerCase().trim()
        return this.props.workshopList
            .filter(x => x.start.includes(this.state.selectedStart))
            .filter(x => (x.name && x.name.toLowerCase().includes(search))
                || (x.nameShort && x.nameShort.toLowerCase().includes(search))
                || (x.hostName && x.hostName.toLowerCase().includes(search))
                || (x.place && x.place.toLowerCase().includes(search))
                || (x.maxVisitors && x.maxVisitors.toString().includes(search))
                || (x.materialNote && x.materialNote.toLowerCase().includes(search))
            )
    }

    render() {
        const {workshopList} = this.props
        return (
            <Page
                className="WorkshopListPage"
                title="Workshopübersicht"
            >
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col xs="12" md="2">
                                        <Link to='/workshop-list/new'>
                                            <Button><FaPlus /> Neu</Button>
                                        </Link>
                                    </Col>
                                    <Col xs="12" md="5">
                                        <Input
                                            type="select"
                                            name="start"
                                            id="start"
                                            value={ this.state.selectedStart }
                                            onChange={e => this.setState({ selectedStart: e.target.value })}
                                            >
                                                <option value=''>Jeder Zeitpunkt</option>
                                                { [...new Set(workshopList.map(x => x.start))].sort().map(x => 
                                                    <option key={x} value={x}>{moment(x).format('dddd HH:mm') + ' Uhr'}</option>
                                                )}
                                        </Input>
                                    </Col>
                                    <Col xs="12" md="5">
                                        <SearchInput onChange={(e) => this.setState({ search: e.currentTarget.value})} />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                { (workshopList && workshopList.length > 0 ) && this.renderList()}
                                { !(workshopList && workshopList.length > 0 ) && <Delay wait={500}><Empty /></Delay>}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        workshopList: state.workshop.workshopList
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getWorkshopList: () => dispatch(WorkshopActions.getWorkshopList()),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(WorkshopListPage);