import React from 'react';
import {
    Button
  } from 'reactstrap'
import { conferenceID } from '../../config/globals';
  import { reportTogglHand,lowerUsersHand } from '../../utils/functions';
  import { IsSuperAdmin } from '../PrivateRoute'

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSetId:0,
            data:[],
            userid:this.props.uid,
            conferenceID: this.props.cid
        }
        this.updateTravelInfos = this.updateTravelInfos.bind(this);
    }

    componentDidMount() {
        this.firstCall()
    }

    async firstCall(){
        console.log(await fetch("http://localhost:2323/travel/"+this.state.cid+"/"+this.state.uid))
       //ToDo: Set State
    }
  
    async updateTravelInfos () {


    }
     render() {
         const saveButtonLabel = this.state.dataSetId === 0 ? "Reiseinformationen speichern" : "Reiseinformationen aktualisieren"
    //     const handButtonLabel = !this.state.handRaised ? "Hand heben" : "Hand senken";
    //     const applicationStatus = (this.state.isAlumni && !this.state.isGuest) ? "- Alumni" : (this.state.isCouncil && !this.state.isGuest)  ? "- Rat" : this.state.isGuest ? "- Gast": "";
    //     const goRight = this.state.isAlumni || this.state.isGuest;

            return (
              <Card>
                <div><span>Reiseinformationen</span><span><Button className="travelBtn" onClick={() => this.getQueue()}>{saveButtonLabel}</Button></span></div>
              </Card>
            )
    }
  }

  
  
export default UserPage;
