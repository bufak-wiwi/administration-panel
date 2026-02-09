import Page from '../../components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Table,
} from 'reactstrap'
import PageSpinner from '../../components/PageSpinner';
import ConferenceActions from '../../redux/conferenceRedux';
import CouncilActions from '../../redux/councilRedux'
import SearchInput from '../../components/SearchInput';

class UserListPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            search: '',
        }
    }

    componentDidMount() {
        this.props.getApplicationList()
        this.props.getCouncilList()
    }

    getFilteredList() {
        const search = this.state.search.toLowerCase().trim()
        // We use applicationList as a source for users
        // Use a Set to ensure unique users if a user appears multiple times (though applicationList usually is per conference)
        // Assuming applicationList contains objects with .user property
        return this.props.applicationList
            .filter(x => x.user)
            .filter(x => `${x.user.name} ${x.user.surname}`.toLowerCase().includes(search)
                || x.user.email.toLowerCase().includes(search)
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

    render() {
        const { applicationList, councilList } = this.props
        if (!applicationList || !councilList) {
          return (
            <PageSpinner color="primary" />
          );
        }
        return (
          <Page
            className="UserListPage"
            title="Nutzerverwaltung"
          >
            <Row>
                <Col>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col xs="12" md="4">
                                <SearchInput onChange={(e) => this.setState({ search: e.currentTarget.value})} placeholder="Suche nach Name, Email, Fachschaft..." />
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Table responsive borderd="true" striped hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Fachschaft</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.getFilteredList().map((x, i) => {
                                return (
                                    <tr key={x.applicantUID} onClick={() => this.props.history.push('/user-management/' + x.applicantUID)}>
                                        <th scope="row">{i+1}</th>
                                        <td>{ `${x.user.name} ${x.user.surname}` }</td>
                                        <td>{ x.user.email }</td>
                                        <td>{ this.getCouncilName(x.user.councilID) }</td>
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
      }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
