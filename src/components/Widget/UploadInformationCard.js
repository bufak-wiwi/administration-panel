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
                    Hier könnt Ihr Euch mit Eurem Prioritätscode für die 82. Bundesfachschaftenkonferenz Wirtschaftswissenschaften vom 18.01.2026 bis zum 22.02.2026 EOD anmelden.<br /><br />
                    Da die Konferenz vom BMBF unterstützt wird, benötigen wir von jeder angemeldeten Person eine aktuelle Immatrikulationsbescheinigung. Bitte benennt die PDF-Datei folgendermaßen: "Stadt_Vorname_Nachname".<br />
                    Diese könnt Ihr unter folgendem Link hochladen: <a href="https://1drv.ms/b/c/8541847e6e62c9f1/IQBIwYgxHAqUS7jfboInn_K6AdMo_oAJnZmgSck9pEDEtek?e=pD8XLK " target="_blank" rel="noopener noreferrer">https://1drv.ms/b/c/8541847e6e62c9f1/IQBIwYgxHAqUS7jfboInn_K6AdMo_oAJnZmgSck9pEDEtek?e=pD8XLK </a><br /><br />
                    Bei Fragen und Anregungen meldet Euch gerne unter dieser E-Mail bei uns: <a href="mailto:guest@stugawiwi.de" target="_blank" rel="noopener noreferrer">guest@stugawiwi.de</a>
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
