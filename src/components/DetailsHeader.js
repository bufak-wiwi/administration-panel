import React, { Component } from 'react';
import { CardHeader, Button, Row } from 'reactstrap';

class DetailsHeader extends Component {

    renderActions() {
        if(this.props.empty) {
            return (
                <Button disabled={this.props.disabled} onClick={this.props.onCreate}>Erstellen</Button>
            )
        } else if (this.props.editing) {
            return (
                <div>
                    <Button style={{ marginRight: 10}} onClick={this.props.onCancel}>Abbrechen</Button>
                    <Button disabled={this.props.disabled} onClick={this.props.onSave}>Speichern</Button>
                </div>
            )
        } else {
            return (
                <Button onClick={this.props.onEdit}>Bearbeiten</Button>
            )
        }
    }
  
    render() {
        return (
            <CardHeader>
                <Row style={{ justifyContent: 'space-between'}}>
                    { this.props.title ? this.props.title : '' }
                    { !this.props.onlyTitle && this.renderActions() }
                </Row>
            </CardHeader>
        )
    }
  }
  
export default DetailsHeader;