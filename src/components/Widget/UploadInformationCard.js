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
                    Herzlich Willkommen auf unserem Konfetti-Anmeldetool! <br /><br />
                    Hier könnt Ihr Euch mit Eurem Prioritätscode für die 83. Bundesfachschaftenkonferenz Wirtschaftswissenschaften vom 29.10.26 bis zum 01.11.26 EOD anmelden.<br /><br />
                    Da die Konferenz vom BMFTR unterstützt wird, benötigen wir von jeder angenommenen Person eine Immatrikulationsbescheinigung für das <b>Wintersemester 2026/2027</b>. Bitte benennt die PDF-Datei folgendermaßen: "Stadt_Vorname_Nachname".<br />
                    Diese könnt Ihr unter folgendem Link hochladen: <a href="https://hs-niederrhein.sciebo.de/s/4yEatMZZQGEeTsF" target="_blank" rel="noopener noreferrer">https://hs-niederrhein.sciebo.de/s/4yEatMZZQGEeTsF</a><br /><br />
                    Bei Fragen und Anregungen meldet Euch gerne unter dieser E-Mail bei uns: <a href="mailto:teilnehmendenbetreuung@gladfak.de" target="_blank" rel="noopener noreferrer">teilnehmendenbetreuung@gladfak.de</a>
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
