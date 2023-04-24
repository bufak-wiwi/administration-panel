import React from 'react';
import {
    Alert,
    Button
  } from 'reactstrap'
  import { reportTogglHand,lowerUsersHand } from '../../utils/functions';
  import { IsSuperAdmin } from '../PrivateRoute'

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goRaised:false,
            handRaised:false,
            reportQueue : [],
            userid:this.props.uid
        }
        this.getQueue = this.getQueue.bind(this);
        this.userHandRaised = this.userHandRaised.bind(this);
        this.userHandRaisedGo = this.userHandRaisedGo.bind(this);
    }

    componentDidMount() {
        console.log(this.props)
        this.userHandRaised()
        this.getQueue()
        setInterval(this.getQueue,500)
    }

    async userHandRaised(uid) {
        if(uid){
            const response = await fetch("https://newapi.bufak-wiwi.org/user/"+uid+"/is_queued")
            const handRaised = await response.json()
            this.setState({handRaised:handRaised.user.isQueued})
            this.getQueue()
        }
    }

    async userHandRaisedGo  (uid) {
        if(uid){
            const response = await fetch("https://newapi.bufak-wiwi.org/user/"+uid+"/is_queued_go")
            const handRaisedGo = await response.json()
            this.setState({goRaised:handRaisedGo.user.isQueued})
            this.getQueue()
        }

    }

      async getQueue () {
            const response = await fetch("https://newapi.bufak-wiwi.org/reports/queue",{})
            const queue = await response.json()
            this.setState({reportQueue:queue.queue})

            const responseHandRaised = await fetch("https://newapi.bufak-wiwi.org/user/"+this.state.userid+"/is_queued")
            const handRaised = await responseHandRaised.json()
            this.setState({handRaised:handRaised.user.isQueued})

            const responseHandRaisedGo = await fetch("https://newapi.bufak-wiwi.org/user/"+this.state.userid+"/is_queued_go")
            const handRaisedGo = await responseHandRaisedGo.json()
            this.setState({goRaised:handRaisedGo.user.isQueued})
    }
  
    render() {
        let goButtonLabel = !this.state.goRaised ? "GO-Antrag" : "GO-Antrag zurückziehen" ;
        let handButtonLabel = !this.state.handRaised ? "Hand heben" : "Hand senken";
        if(IsSuperAdmin){
            return (
                <div>
                <Button onClick={() => reportTogglHand(0,this.props.uid,this.state.handRaised, ()=>this.setState({...this.state, handRaised: !this.state.handRaised}))}>{handButtonLabel}</Button>
                <Button onClick={() => reportTogglHand(1,this.props.uid,this.state.goRaised, ()=>this.setState({...this.state, goRaised: !this.state.goRaised}))}>{goButtonLabel}</Button>
                {this.state.reportQueue.map(function(d){
                    let itemClass = "report-normal";
                    if(d[3] == 1){
                        itemClass = "report-go";
                    }
                   return (<div className={itemClass}><span>{d[0]} {d[1]}</span> <span>{d[2]}</span><span onClick={() => lowerUsersHand(d[3],d[5])} >Meldung senken</span></div>)
                 })}
                 
                </div>
            )
        } else {
            return (
                <div>
                <Button onClick={() => reportTogglHand(0,this.props.uid,this.state.handRaised, ()=>this.setState({...this.state, handRaised: !this.state.handRaised}))}>{handButtonLabel}</Button>
                <Button onClick={() => reportTogglHand(1,this.props.uid,this.state.goRaised, ()=>this.setState({...this.state, goRaised: !this.state.goRaised}))}>{goButtonLabel}</Button>
                {this.state.reportQueue.map(function(d){
                    let itemClass = "report-normal";
                    if(d[3] == 1){
                        itemClass = "report-go";
                    }
                   return (<div className={itemClass}><span>{d[0]} {d[1]}</span> <span>{d[2]}</span></div>)
                 })}
                 
                </div>
            )
        }
    }
  }

  
  
export default UserPage;
