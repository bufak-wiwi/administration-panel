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
                    Hier könnt Ihr Euch mit Eurer Prioritätenliste für die 77. Bundesfachschaftenkonferenz Wirtschaftswissenschaften vom 24.07.2023 bis zum 07.08.2023 EOD anmelden.<br />
                    Da die Konferenz vom BMBF unterstützt wird, benötigen wir von jeder angemeldeten Person eine aktuelle Immatrikulationsbescheinigung. Bitte benennt die PDF-Datei folgendermaßen: "Stadt_Vorname_Nachname".<br />
                    Diese könnt Ihr unter folgendem Link hochladen: <a href="https://cloud.fs1.de/s/PAWg3WYFqzJagrN" target="_blank" rel="noopener noreferrer">https://cloud.fs1.de/s/PAWg3WYFqzJagrN</a><br />
                    Bei Fragen und Anregungen meldet Euch gerne unter dieser E-Mail bei uns: <a href="mailto:bufakteilnehmende@fs1.de" target="_blank" rel="noopener noreferrer">bufakteilnehmende@fs1.de</a>
                    <br />
                    <br />
                    Wir würden euch noch darum bitten, Vorschläge für Workshops über diese Umfrage einzureichen.<br/>
                    Checkt bitte vor auf unserer <a href = "" target="_blank" rel="noopener noreferrer">Webseite</a>, welche Workshops schon geplant sind, damit Dopplungen in den Vorschlägen vermieden werden können.<br />
                    Workshop Einreichungen: <a href = "https://forms.gle/oSgeTcg3VCLD8Ask9" target="_blank" rel="noopener noreferrer">https://forms.gle/oSgeTcg3VCLD8Ask9</a>
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
