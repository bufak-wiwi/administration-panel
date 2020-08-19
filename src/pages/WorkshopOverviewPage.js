import Page from 'components/Page';
import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Row, Col } from 'reactstrap'
import WorkshopActions from '../redux/workshopRedux'
import PageSpinner from '../components/PageSpinner';
import { toGermanTime } from '../utils/functions';
import {Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
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
    <div style={{flex: 1}}>
        { workshops.map(x =>
            <Accordion key={x.workshopID}>
                <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    key={x.workshopID}
                >{x.name}</AccordionSummary>
                <AccordionDetails>
                    <Col>
                        <Row style={{alignItems: 'center'}}><MdPerson /> <b>{x.hostName}</b></Row>
                        <Row><b>Beschreibung:</b></Row>
                        <Row>{x.overview}</Row>
                    </Col>
                </AccordionDetails>
            </Accordion>  
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
                <Accordion key={x} TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary
                        expandIcon={<MdExpandMore />}
                        aria-controls="panel1a-content"
                        key={x}
                    >{x}</AccordionSummary>
                    <AccordionDetails>{this.renderWorkshopsForTime(x)}</AccordionDetails>
                </Accordion>
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
