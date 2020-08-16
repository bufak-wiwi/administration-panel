import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Col, Row, Alert } from 'reactstrap';
import PageSpinner from '../PageSpinner'
import ButtonWithTimeout from './ButtonWithTimeout'

class QuestionVotingActive extends Component {

    render() {
        const { question, fetching, onReload } = this.props
        if (!question || question.resolvedOn) {
            return null
        }
        return (
            <Card>
                <CardHeader style={{justifyContent: "space-between", flex: 1}}>
                    <Col>
                    <Row style={{ justifyContent: 'space-between'}}>
                        Abstimmung: {question.questionText}
                        <ButtonWithTimeout text="Refresh" onClick={onReload} timeout={5000}/>
                    </Row>
                    </Col>
                </CardHeader>
                <CardBody>
                    { fetching 
                    ? <PageSpinner color="primary" />
                    : <Alert color="warning">Diese Abstimmung ist offen und wird gerade abgestimmt. Die Ergebnisse siehst du sobald diese geschlossen wurde.</Alert>
                }       
                </CardBody>
            </Card>
        )
    }
}

export default QuestionVotingActive;