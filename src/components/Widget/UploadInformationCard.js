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
                    Liebe BuFaKis, <br />
                    willkommen auf unserem Konfetti-Anmeldetool! <br />
                    Hier könnt Ihr Euch mit Eurer Prioritätenliste für die 78. Bundesfachschaftenkonferenz Wirtschaftswissenschaften vom 12.01.2024 bis zum 28.02.2024 EOD anmelden. <br />
                    Da die Konferenz vom BMBF unterstützt wird, benötigen wir von jeder angemeldeten Person eine aktuelle Immatrikulationsbescheinigung. Bitte benennt die PDF-Datei folgendermaßen: "Stadt_Vorname_Nachname". <br />
                    Diese könnt Ihr unter folgendem Link hochladen: <a href="https://fsr.wiwi.nrw/s/YSaG3oMGKM4sgQr" target="_blank" rel="noopener noreferrer">https://fsr.wiwi.nrw/s/YSaG3oMGKM4sgQr</a> <br />
                    Bei Fragen und Anregungen meldet Euch gerne unter dieser E-Mail bei uns: <a href="mailto:bufakis@fswiwi-dortmund.de " target="_blank" rel="noopener noreferrer">bufakis@fswiwi-dortmund.de </a> 
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
