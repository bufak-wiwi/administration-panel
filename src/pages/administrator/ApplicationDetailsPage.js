import Page from '../../components/Page';
import React from 'react';
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from 'reactstrap'
import PageSpinner from '../../components/PageSpinner';
import ConferenceActions from '../../redux/conferenceRedux';
import CouncilActions from '../../redux/councilRedux'

// const priorities = [
//     {name: '1', id: 'priority', value: 1},
//     {name: '2', id: 'priority', value: 2},
//     {name: '3', id: 'priority', value: 3},
//     {name: '4', id: 'priority', value: 4},
//     {name: '5', id: 'priority', value: 5},
//     {name: '6', id: 'priority', value: 6},
//     {name: 'Alumnus', id: 'isAlumhnus', value: true},
//     {name: 'BuFaK Rat', id: 'isBuFaKCouncil', value: true},
//     {name: 'Helfer', id: 'isHelper',  value: true},
// ]

class ApplicationListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        if (!this.props.applicationList || !this.props.councilList) {
            this.props.getApplicationList()
            this.props.getCouncilList()
        }
    }

    componentDidUpdate(prevProbs, prevState) {
        if (prevProbs.applicationList !== this.props.applicationList) {
            console.log('got the list')
        }
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

  render() {
      
    const { applicationList, councilList } = this.props;
    if (applicationList.length === 0 || councilList.length === 0) {
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
                    
                </CardHeader>
                <CardBody>

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

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationListPage);
