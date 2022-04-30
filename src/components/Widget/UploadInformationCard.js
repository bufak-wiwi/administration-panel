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
                    willkommen auf unserem Konfetti Anmeldetool!<br />
                    Hier könnt Ihr euch mit Eurer Prioritätenliste bis zum 18.02.2022 um 23:59 Uhr anmelden.<br />
                    Da die Konferenz vom BMBF unterstützt wird, benötigen wir von jeder angemeldeten Personen eine aktuelle Immatrikulationsbescheinigung. Bitte benennt die PDF-Datei folgendermaßen: "Stadt_Vorname_Nachname". <br />
                    Diese könnt Ihr unter folgendem Link auf OwnCloud hochladen: <a href="https://owncloud.gwdg.de/index.php/s/PxI8hTi1HSRf1C7" target="_blank" rel="noopener noreferrer">https://owncloud.gwdg.de/index.php/s/PxI8hTi1HSRf1C7/</a> <br />
                    Bei Fragen und Anregungen meldet Euch gerne unter dieser E-Mail bei uns: <a href="mailto:bufak-teilnehmende@uni-goettingen.de">bufak-teilnehmende@uni-goettingen.de</a>
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
