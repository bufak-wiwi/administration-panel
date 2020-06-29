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
                    wie ihr alle wahrscheinlich bereits wisst, wird unsere Konferenz von dem BMBF unterstützt. Um die Zuwendungen zu erhalten ist es allerdings nötig, dass wir eine Immatrikulationsbescheinigung von euch nachweisen können, denn <b>nur dann senkt sich euer Teilnehmerbeitrag</b>.<br />
                    Ihr könnt sie unter diesem Link <a href="https://www.dropbox.com/request/raC7OjVGjFdzSFqfAdGO" target="_blank" rel="noopener noreferrer">https://www.dropbox.com/request/raC7OjVGjFdzSFqfAdGO</a> hochladen.<br/>
                    Bitte füllt neben der eigentlichen Anmeldung auch kurz dieses <a href="https://forms.gle/kdk78Fpy4kgc4vML7" target="_blank" rel="noopener noreferrer">Formular</a> aus! Für unseren internen Ablauf ist das äußerst wichtig, auch wenn sich Abfragen doppeln.<br/>Danke für eure Zeit. :)
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
