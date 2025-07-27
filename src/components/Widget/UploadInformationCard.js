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
            <CardHeader>Studienbescheinigung hochladen</CardHeader>
            <CardBody>
                <Alert color="grey">
                    Herzlich Willkommen auf unserem Konfetti-Anmeldetool!<br /><br />
                    Hier könnt Ihr Euch mit Eurem Prioritätscode für die 81. Bundesfachschaftenkonferenz Wirtschaftswissenschaften vom 28.07.2025 bis zum 31.08.2025 EOD anmelden.<br /><br />
                    Da die Konferenz vom BMBF unterstützt wird, benötigen wir von jeder angemeldeten Person eine aktuelle Immatrikulationsbescheinigung. Bitte benennt die PDF-Datei folgendermaßen: "Stadt_Vorname_Nachname".<br />
                    Diese könnt Ihr unter folgendem Link hochladen: <a href="https://nc.uni-bremen.de/index.php/s/MFtc3HYqQ5ryfNQ" target="_blank" rel="noopener noreferrer">https://nc.uni-bremen.de/index.php/s/MFtc3HYqQ5ryfNQ</a><br /><br />
                    Bei Fragen und Anregungen meldet Euch gerne unter dieser E-Mail bei uns: <a href="mailto:bufak-teilnehmende@ovgu.de" target="_blank" rel="noopener noreferrer">bufak-teilnehmende@ovgu.de</a>
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
