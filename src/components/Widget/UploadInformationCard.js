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
                    willkommen zur ersten Präsenz BuFaK seit Beginn der Pandemie, in Hohenheim! Weitere Infos zur 73. BuFaK erhaltet ihr per Mail und auf unserer Homepage.<br />
                    Wie ihr alle wahrscheinlich bereits wisst, wird unsere Konferenz von dem BMBF unterstützt. Um die Zuwendungen zu erhalten, ist es allerdings nötig, dass wir eine Immatrikulationsbescheinigung von euch nachweisen können. Ihr könnt sie unter diesem Link <a href="https://www.dropbox.com/request/ln5XV8fcd12vaC4aWGMR" target="_blank" rel="noopener noreferrer">https://www.dropbox.com/request/ln5XV8fcd12vaC4aWGMR</a> hochladen.<br /> 
                    Bei weiteren Fragen meldet euch gerne bei der Orga.<br />
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
