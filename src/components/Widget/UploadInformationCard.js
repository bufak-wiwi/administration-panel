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
                    Herzlich Willkommen auf unserem Konfetti-Anmeldetool!<br /><br />
                    Hier könnt Ihr Euch mit Eurer Prioritätenliste für die 79. Bundesfachschaftenkonferenz Wirtschaftswissenschaften vom 01.08.2024 bis zum 30.08.2024 EOD anmelden.<br /><br />
                    Da die Konferenz vom BMBF unterstützt wird, benötigen wir von jeder angemeldeten Person eine aktuelle Immatrikulationsbescheinigung. Bitte benennt die PDF-Datei folgendermaßen: "Stadt_Vorname_Nachname".<br />
                    Diese könnt Ihr unter folgendem Link hochladen: <a href="https://uni-wuppertal.sciebo.de/s/YONzJykwa68SoLv" target="_blank" rel="noopener noreferrer">https://uni-wuppertal.sciebo.de/s/YONzJykwa68SoLv</a><br /><br />
                    Bei Fragen und Anregungen meldet Euch gerne unter dieser E-Mail bei uns: <a href="mailto:teilnehmende-bufak@wiwi.uni-wuppertal.de" target="_blank" rel="noopener noreferrer">teilnehmende-bufak@wiwi.uni-wuppertal.de</a>
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
