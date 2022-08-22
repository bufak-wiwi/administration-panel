import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, Alert, CardBody } from 'reactstrap'

class UploadInformationCard extends Component {

  render() {
    const {
        show = true,
    } = this.props

    if (!show) {
        return null
    }

    return (
        <Card>
            <CardHeader >Studienbescheinigung hochladen</CardHeader>
            <CardBody>
                <Alert color="grey">
                    Liebe Teilnehmende,<br />
                    willkommen auf unserem Konfetti-Anmeldetool!<br />
                    Hier könnt Ihr Euch mit Eurer Prioritätenliste bis zum 30.09.2022 um 20 Uhr anmelden.<br />
                    Da die Konferenz vom BMBF unterstützt wird, benötigen wir von jeder angemeldeten Person eine aktuelle Immatrikulationsbescheinigung. Bitte benennt die PDF-Datei folgendermaßen: "Stadt_Vorname_Nachname". <br />
                    Diese könnt Ihr unter folgendem Link hochladen: <a href="https://glidser.bufak-wiwi.org/s/Pqqic53P4GmpcSg" target="_blank" rel="noopener noreferrer">https://glidser.bufak-wiwi.org/s/Pqqic53P4GmpcSg</a> <br />
                    Bei Fragen und Anregungen meldet Euch gerne unter dieser E-Mail bei uns: <a href="mailto:teilnehmende.bufak@uni-oldenburg.de" target="_blank" rel="noopener noreferrer">teilnehmende.bufak@uni-oldenburg.de</a>
                </Alert>
            </CardBody> 
        </Card>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadInformationCard)
