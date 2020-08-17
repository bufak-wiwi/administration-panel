import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, Row } from 'reactstrap';
import { 
    Divider,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormHelperText,
    Dialog,
    Slide,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions, 
    Snackbar,
    IconButton
} from '@material-ui/core';
import { MdClose } from 'react-icons/md';
import CouncilVote from './CouncilVote'
import PageSpinner from '../PageSpinner'
import ButtonWithTimeout from './ButtonWithTimeout'
import { getCouncilPriorityOfUser } from '../../utils/functions'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class VotingForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            vote: '',
            canUserOverwrite: false,
            helperText: '',
            displayMessage: '',
            voted: false,
        }
    }

    componentDidMount() {
        if (this.state.helperText === '' && this.props.question) {
            this.setHelperText(this.props.question.councilAnswer)
        }
    }

    setHelperText(councilAnswer) {
        var helperText = ""
        var canUserOverwrite = false
        if(this.canUserOverwriteVote(councilAnswer)) {
            helperText = "Beachte: Deine Wahl kann von jemanden mit einer höheren Priorität aus deiner Fachschaft überstimmt werden." 
            canUserOverwrite = true
        } else {
            helperText = "Du kannst leider nicht mehr abstimmen, da bereits jemand aus deiner Fachschaft mit einer höheren Priorität abgestimmt hat"
        }
        this.setState({ helperText, canUserOverwrite })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fetching && !this.props.fetching && this.state.voted) {
            if (this.props.error) {
                this.setState({ displayMessage: "Deine Abstimmung war leider fehlerhaft. Jemand aus deiner Fachschaft mit mit einer höheren Priorität hat bereits etwas gewählt."})
            } else if (this.props.success) {
                this.setState({ displayMessage: "Deine Abstimmung war erfolgreich."})
            }
        }
      }

    closeDialogAndCallSubmit(onSubmit, vote) {
        this.setState({ isOpen: false, voted: true })
        onSubmit(vote)
    }

    renderConfirm(onSubmit, vote, councilAnswer) {
        return (
            <Dialog
                open={this.state.isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => this.setState({ isOpen: false})}
                aria-labelledby="title"
                aria-describedby="description"
            >
                <DialogTitle id="title">Auswahl bestätigen</DialogTitle>
                <DialogContent>
                    <DialogContentText id="description">
                        Möchtest du für <b>{vote}</b> stimmen? 
                        { councilAnswer && councilAnswer.vote !== vote && " Du überschreibst damit das bisherige Votum deiner Fachschaft."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button outline onClick={() => this.setState({ isOpen: false})} color="danger">Abbrechen</Button>
                    <Button outline onClick={() => this.closeDialogAndCallSubmit(onSubmit, vote)} color="primary">Jetzt Abstimmen</Button>
                </DialogActions>
            </Dialog>
        )
    }
    
    canUserOverwriteVote(councilAnswer) {
        return !councilAnswer || getCouncilPriorityOfUser() <= councilAnswer.priority
    }

    renderCardBody() {
        const { question } = this.props
        const { vote, canUserOverwrite, helperText } = this.state
        return (
            <div>
                <CouncilVote question={question}/>
                <FormControl component="fieldset" error={!canUserOverwrite}>
                    <RadioGroup aria-label="vote" name="vote" value={vote} onChange={(event) => this.setState({ vote: event.target.value })}>
                        <FormControlLabel value="Ja" control={<Radio />} label="Ja" />
                        <FormControlLabel value="Nein" control={<Radio />} label="Nein" />
                        <FormControlLabel value="Enthaltung" control={<Radio />} label="Enthaltung" />
                    </RadioGroup>
                    <FormHelperText>{helperText}</FormHelperText>
                </FormControl>
                <Divider style={{marginTop: 10, marginBottom: 10}}/>
                <Button
                    style={!vote || !canUserOverwrite ? { backgroundColor: "#3a5c61"} : {}}
                    disabled={!vote || !canUserOverwrite}
                    onClick={() => this.setState({ isOpen: true})}
                    block
                > Abstimmen</Button>
            </div>
        )
    }

    render() {
        const { question, onSubmit, fetching, onReload } = this.props
        const { vote } = this.state
        if (!question || question.resolvedOn) {
            return null
        }
        return (
        <form onSubmit={() => this.setState({ isOpen: true})}>
            <Card>
                <CardHeader style={{justifyContent: "space-between", flex: 1}}>
                    <Row style={{ justifyContent: 'space-between', marginLeft: 5}}>
                        Abstimmung: {question.questionText}
                        <div>{question.totalVotes ? `(${question.totalVotes}/${question.arrivedCouncilCount} abgestimmt) ` : ''}
                        <ButtonWithTimeout text="Refresh" onClick={onReload} timeout={5000}/>
                        </div>
                    </Row>
                </CardHeader>
                <CardBody>
                    { fetching 
                        ? <PageSpinner color="primary" />
                        : this.renderCardBody()
                    }
                </CardBody>
                { this.renderConfirm(onSubmit, vote, question.councilAnswer) }
            </Card>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.state.displayMessage !== ""}
                autoHideDuration={6000}
                onClose={() => this.setState({ displayMessage: "", voted: false})}
                ContentProps={{'aria-describedby': 'message-id'}}
                message={<span id="message-id">{this.state.displayMessage}</span>}
                action={[
                    <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    onClick={() => this.setState({ displayMessage: "",  voted: false})}
                    >
                    <MdClose />
                    </IconButton>,
                ]}
            />
        </form>
        )
    }
}

export default VotingForm;