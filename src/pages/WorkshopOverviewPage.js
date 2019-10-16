import Page from 'components/Page';
import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Row, Col } from 'reactstrap'
import WorkshopActions from '../redux/workshopRedux'
import PageSpinner from '../components/PageSpinner';
import { toGermanTime } from '../utils/functions';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { MdExpandMore, MdPerson } from 'react-icons/md';
class WorkshopOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activeStep: 0,
        mounted: false,
        steps: [],
        selected: null,
        isOpen: false,
    }
  }

  componentDidMount() {
    this.props.getWorkshopList()
  }

  componentDidUpdate() {
      if (this.props.workshopList && this.props.workshopList.length !== 0 && !this.state.mounted) {
        const steps = [];
        [...new Set(this.props.workshopList.map(x => x.start))].sort().forEach(x => {
            steps.push(toGermanTime(x))
        })
        this.setState({ steps, mounted: true })
      }
  }

  renderWorkshopsForTime(step) {
    const workshops = this.props.workshopList.filter(x => toGermanTime(x.start) === step)
    return (
    <div>
        { workshops.map(x =>
            <ExpansionPanel key={x.workshopID}>
                <ExpansionPanelSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    key={x.workshopID}
                >{x.name}</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Col>
                        <Row style={{alignItems: 'center'}}><MdPerson /> <b>{x.hostName}</b></Row>
                        <Row><b>Beschreibung:</b></Row>
                        <Row>{x.overview}</Row>
                    </Col>
                </ExpansionPanelDetails>
            </ExpansionPanel>  
        )}
    </div>
    )
  }



  render() {
    const { workshopList } = this.props
    const { steps } = this.state

    return (
      <Page
        title={'Workshopübersicht'}
      >
        { !workshopList && <Card><CardBody><PageSpinner/></CardBody></Card>}
        { workshopList && 
            steps.map(x => 
                <ExpansionPanel key={x} TransitionProps={{ unmountOnExit: true }}>
                    <ExpansionPanelSummary
                        expandIcon={<MdExpandMore />}
                        aria-controls="panel1a-content"
                        key={x}
                    >{x}</ExpansionPanelSummary>
                    <ExpansionPanelDetails>{this.renderWorkshopsForTime(x)}</ExpansionPanelDetails>
                </ExpansionPanel>
            )
        }
     </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workshopList: state.workshop.workshopList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWorkshopList: () => dispatch(WorkshopActions.getWorkshopList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopOverviewPage);
