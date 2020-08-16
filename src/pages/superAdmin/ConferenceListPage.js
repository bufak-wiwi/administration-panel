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
} from 'reactstrap'
import Delay from '../../components/Delay'
import ConferenceActions from '../../redux/conferenceRedux'
import CouncilActions from '../../redux/councilRedux';
import SearchInput from '../../components/SearchInput';
import {Link} from 'react-router-dom';
import {
    FaPlus
  } from 'react-icons/fa';
import moment from 'moment';
import Empty from '../../components/Empty';
require('moment/locale/de.js')



class ConferenceListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            selectedStart: '',
            isOpen: false,
        }
    }

    componentDidMount() {
        this.props.getConferenceList();
        this.props.getCouncilList();
    }

    getCouncileName(id) {
        return this.props.councilList.filter(x => x.councilID === id)[0].name
    }

    renderList() {
        return (
            <Table responsive borderd="true" striped hover>
                <thead><tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Beginn</th>
                    <th>Ende</th>
                    <th>Fachschaft</th>    
                    <th>Teilnehmer</th> 
                    <th>Alumni</th>
                </tr></thead>
                <tbody>
                    { this.getFilteredConferenceList().map((x, i) => 
                        <tr key={x.conferenceID} onClick={() => this.props.history.push('/conferences/' + x.conferenceID)}>
                            <th scope="row">{i+1}</th>
                            <td>{x.name}</td>
                            <td>{moment(x.dateStart).format('DD.MM.YYYY')}</td>
                            <td>{moment(x.dateEnd).format('DD.MM.YYYY')}</td>
                            <td>{this.getCouncileName(x.councilID)}</td>
                            <td>{x.attendeeCost}€</td>
                            <td>{x.alumnusCost}€</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }

    getFilteredConferenceList() {
        const search = this.state.search.toLowerCase().trim()
        return this.props.conferenceList
            .filter(x => (x.name && x.name.toLowerCase().includes(search))
                || (x.councilID && this.getCouncileName(x.councilID).toLowerCase().includes(search))
            )
    }

    render() {
        const { conferenceList, councilList} = this.props
        return (
            <Page
                className="conferenceListPage"
                title="Konferenzübersicht"
            >
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col xs="12" md="2">
                                        <Link to='/conference/new'>
                                            <Button><FaPlus /> Neu</Button>
                                        </Link>
                                    </Col>
                                    <Col xs="12" md="5">
                                        <SearchInput onChange={(e) => this.setState({ search: e.currentTarget.value})} />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                { (conferenceList && conferenceList.length > 0 && councilList.length > 0) && this.renderList()}
                                { !(conferenceList && conferenceList.length > 0 && councilList.length > 0) && <Delay wait={500}><Empty /></Delay>}
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
        conferenceList: state.conference.conferenceList,
        councilList: state.council.councilList
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getConferenceList: () => dispatch(ConferenceActions.getConferenceList()),
        getCouncilList: () => dispatch(CouncilActions.getCouncilList()),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ConferenceListPage);