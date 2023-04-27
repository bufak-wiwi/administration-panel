import React from 'react';
import {
    Alert,
    Button
  } from 'reactstrap'
  import { reportTogglHand,lowerUsersHand,getType } from '../../utils/functions';
  import { IsSuperAdmin } from '../PrivateRoute'

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goRaised:false,
            handRaised:false,
            isCouncil:false,
            isAlumni:false,
            isGuest:false,
            reportQueue : [],
            userid:this.props.uid
        }
        this.getQueue = this.getQueue.bind(this);
        this.userHandRaised = this.userHandRaised.bind(this);
        this.userHandRaisedGo = this.userHandRaisedGo.bind(this);
    }

    componentDidMount() {
        this.firstCall()
    }

    async firstCall(){
        console.log(this.props)
        await this.getApplicationInfo(this.props.uid)
        await this.userHandRaised()
        this.getQueue()
        if(IsSuperAdmin()){
            setInterval(this.getQueue,5000)
        } else {
            setInterval(this.getQueue,60000)
        }
    }

    async getApplicationInfo(uid){
        if(uid){
            const response = await fetch("https://newapi.bufak-wiwi.org/user/"+uid+"/applicationinfos")
            const applicationInfos = await response.json()
            if (applicationInfos.applicationinfos){
                if(applicationInfos.applicationinfos[1] == 1)
                    this.setState({isAlumni:true})
                if(applicationInfos.applicationinfos[2] == 1)
                    this.setState({isCouncil:true})
                if (applicationInfos.applicationinfos[3] != "IsAttendee")
                    this.setState({isGuest:true})
            } else {
                this.setState({isGuest:true})
            }
        }
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

      async getQueue (adm=false) {
            const response = await fetch("https://newapi.bufak-wiwi.org/reports/queue",{})
            const queue = await response.json()
            this.setState({reportQueue:queue.queue})
            if(!adm){
                const responseHandRaised = await fetch("https://newapi.bufak-wiwi.org/user/"+this.state.userid+"/is_queued")
                const handRaised = await responseHandRaised.json()
                this.setState({handRaised:handRaised.user.isQueued})
    
                const responseHandRaisedGo = await fetch("https://newapi.bufak-wiwi.org/user/"+this.state.userid+"/is_queued_go")
                const handRaisedGo = await responseHandRaisedGo.json()
                this.setState({goRaised:handRaisedGo.user.isQueued})
            }

    }

    toggledHand(type){
        if (type == "go"){
            this.setState({...this.state, goRaised: !this.state.goRaised})
        } else if ("hand"){
            this.setState({...this.state, handRaised: !this.state.handRaised})

        }
        this.getQueue()

    }
  
    render() {
        const goButtonLabel = !this.state.goRaised ? "Antrag an den Sitzungsvorstand" : "Antrag an den Sitzungsvorstand (Hand senken)" ;
        const handButtonLabel = !this.state.handRaised ? "Hand heben" : "Hand senken";
        const applicationStatus = (this.state.isAlumni && !this.state.isGuest) ? "- Alumni" : (this.state.isCouncil && !this.state.isGuest)  ? "- Rat" : this.state.isGuest ? "- Gast": "";
        const goRight = this.state.isAlumni || this.state.isGuest;

            return (
                <div>
                <Button className='reportButton' onClick={() => reportTogglHand(0,this.props.uid,this.state.handRaised,applicationStatus, ()=> this.toggledHand("hand"))}>{handButtonLabel}</Button>
                {!goRight
                 ? <Button className='reportButton' onClick={() => reportTogglHand(1,this.props.uid,this.state.goRaised,applicationStatus, ()=> this.toggledHand("go"))}>{goButtonLabel}</Button>
                 : null
                }
                <Button className='syncButton' onClick={() => this.getQueue()}>Redeliste aktualisieren</Button>
                {this.state.reportQueue.map(function(d){
                    let time = new Date(d[4])
                    time = time.toLocaleTimeString()
                    let itemClass = "report-normal";
                    if(d[3] == 1){
                        itemClass = "report-go";
                    }
                    if(IsSuperAdmin()){
                        return (<div className={itemClass}><span className='name'>{d[0]} {d[1]}</span> <span className='university'>{d[2]} {d[6]}</span><span className='time'>{time} Uhr</span><span className='adminButton' onClick={()=> lowerUsersHand(d[3],d[5],applicationStatus,()=>this.getQueue(true))} >Meldung senken</span></div>)
                    } else {
                        return (<div className={itemClass}><span className='name'>{d[0]} {d[1]}</span> <span className='university'>{d[2]} {d[6]}</span><span className='time'>{time} Uhr</span></div>)
                    }
                 })}
                 
                </div>
            )
    }
  }

  
  
export default UserPage;
