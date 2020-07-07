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
                    Liebe Teilnehmenden,<br />
                    willkommen zur ersten, digitalen BuFaK! Diese gilt regulär als unsere 70. BuFaK WiSo, nur, dass wir uns nicht in Präsenz treffen können. Die genauen Infos erfolgen nach eurer erfolgten Anmeldung per Mail. <br />
                    Wie ihr alle wahrscheinlich bereits wisst, wird unsere Konferenz von dem BMBF unterstützt. Um die Zuwendungen zu erhalten, ist es allerdings nötig, dass wir eine <b>Immatrikulationsbescheinigung</b> von euch nachweisen können.
                    Ihr könnt sie unter diesem Link <a href="https://cloud.uni-jena.de/s/MP2EGW66GAyGTyb" target="_blank" rel="noopener noreferrer">https://cloud.uni-jena.de/s/MP2EGW66GAyGTyb</a> hochladen.<br />
                    Bei weiteren Fragen meldet euch gerne bei Ken.<br />
                    Wir freuen uns auf euch!
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
