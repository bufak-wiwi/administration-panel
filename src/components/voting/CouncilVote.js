import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class CouncilVote extends Component {
  
    render() {
        const { question } = this.props
        if (!question || !question.councilAnswer) {
            return (
                <Alert color="warning" style={{flex: 1}}>
                    Deine Fachschaft hat bisher nicht abgestimmt.
                </Alert>
            )
        }
        return (
            <Alert color="info" style={{flex: 1}}>
                Deine Fachschaft hat {!question.isSecret && "für"} <b>{question.councilAnswer.vote}</b> abgestimmt (Prio: {question.councilAnswer.priority})
            </Alert>
        )
    }
  }
  
export default CouncilVote;