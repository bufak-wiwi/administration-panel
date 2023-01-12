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
                    Hier könnt Ihr Euch mit Eurer Prioritätenliste für die 76. Bundesfachschaftenkonferenz Wirtschaftswissenschaften vom 23.01.2023 bis zum 17.02.2023 EOD anmelden.<br />
                    Da die Konferenz vom BMBF unterstützt wird, benötigen wir von jeder angemeldeten Person eine aktuelle Immatrikulationsbescheinigung. Bitte benennt die PDF-Datei folgendermaßen: "Stadt_Vorname_Nachname".<br />
                    Diese könnt Ihr unter folgendem Link hochladen: <a href="https://glidser.bufak-wiwi.org/s/bHDxFMYDJgGdeYi" target="_blank" rel="noopener noreferrer">https://glidser.bufak-wiwi.org/s/bHDxFMYDJgGdeYi</a><br />
                    Bei Fragen und Anregungen meldet Euch gerne unter dieser E-Mail bei uns: <a href="mailto:bufakteilnehmende@fsrwiwi-leipzig.de" target="_blank" rel="noopener noreferrer">bufakteilnehmende@fsrwiwi-leipzig.de</a>
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
