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
                    Hier könnt Ihr Euch mit Eurem Prioritätscode für die 82. Bundesfachschaftenkonferenz Wirtschaftswissenschaften vom 18.01.2026 bis zum 22.02.2026 EOD anmelden.<br /><br />
                    Da die Konferenz vom BMFTR unterstützt wird, benötigen wir von jeder angenommenen Person eine Immatrikulationsbescheinigung für das <b>SommerSemester2026</b>. Bitte benennt die PDF-Datei folgendermaßen: "Stadt_Vorname_Nachname".<br />
                    Diese könnt Ihr unter folgendem Link hochladen: <a href="https://nc.uni-bremen.de/index.php/s/s93NFj3nWoekWXM" target="_blank" rel="noopener noreferrer">https://nc.uni-bremen.de/index.php/s/s93NFj3nWoekWXM</a><br /><br />
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
