import React, { Component } from 'react';
import { Card, CardBody, Row, Col, Alert } from 'reactstrap';
import { HorizontalBar, Bar } from 'react-chartjs-2';
import { isMobile } from 'react-device-detect';

class QuestionResultAdmin extends Component {
  
    render() {
        const { question, accepted, hideStatus } = this.props
        const data = {
            labels: ['Ja', 'Nein', 'Enthaltung'],
            datasets: [{
                data: [question.sumYes, question.sumNo, question.sumAbstention],
                backgroundColor: [
                    'rgba(0,255,0,0.6)',
                    'rgba(255,0,0,0.6)',
                    'rgba(127,127,127,0.6)'
                ],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                hoverBackgroundColor: [
                    'rgba(0,255,0,1)',
                    'rgba(255,0,0,1)',
                    'rgba(127,127,127,1)'
                ],
                minBarLength: 2,
            }]
        }
        const options = {
            legend: {
                display: true,
                position: "top",
                labels: {
                    generateLabels: () => [
                        {text: `Ja: ${question.sumYes}`, fillStyle: 'rgba(0,255,0,0.6)'},
                        {text: `Nein: ${question.sumNo}`, fillStyle: 'rgba(255,0,0,0.6)'},
                        {text: `Enhaltung: ${question.sumAbstention}`, fillStyle: 'rgba(127,127,127,0.6)'}
                    ]
                }
            },
            title: {
                display: true,
                text: `${question.questionText} (${question.sumYes + question.sumNo + question.sumAbstention} Stimmen)`
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                    } 
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    } 
                }]
            },
            maintainAspectRatio: false
        }
        return (
            <Card>
                <Alert color={hideStatus ? "primary" : accepted? "success" : "danger"}>
                    Abstimmung: {question.questionText} {hideStatus ? "" : accepted? " (angenommen)" : " (abgelehnt)"}
                </Alert>
                <CardBody>
                    <Col>
                        <Row style={{flex: 1}}>
                            <div style={{width: "100%", minHeight: 300}}>
                                { isMobile
                                    ? <Bar data={data} options={options}/>
                                    : <HorizontalBar data={data} options={options}/> 
                                }
                            </div>
                        </Row>
                    </Col>
                </CardBody>
            </Card>
        )
    }
  }
  
export default QuestionResultAdmin;