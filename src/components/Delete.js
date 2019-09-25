import React, { Component } from 'react';
import {
    CardBody,
    Button
} from 'reactstrap'
import { Divider, Dialog, Slide, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class Delete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    renderConfirm(onDelete, type, name) {
        return (
            <Dialog
                open={this.state.isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => this.setState({ isOpen: false})}
                aria-labelledby="title"
                aria-describedby="description"
            >
                <DialogTitle id="title">Bist du dir sicher?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="description">
                        Möchtest du {type} <b>{name}</b> wirklich löschen? Diese Aktion kann nicht wieder rückgängig gemacht werden.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button outline onClick={() => this.setState({ isOpen: false})} color="primary">Abbrechen</Button>
                    <Button outline onClick={onDelete} color="danger">Löschen</Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        const { 
            onDelete = () => alert("Implement onDelete function using the 'onDelete'-Prop"),
            dividerTop = true,
            dividerBottom = false,
            disabled = false,
            show = true,
            type = '',
            name = '',
        } = this.props;
        if (!show) {
            return null;
        }

        return (
            <div>
                { dividerTop && <Divider />}
                <CardBody>
                    <Button
                        block
                        disabled={disabled}
                        color="danger"
                        onClick={() => this.setState({ isOpen: true})}
                    >
                        Löschen
                    </Button>
                </CardBody>
                { dividerBottom && <Divider />}
                { this.renderConfirm(onDelete, type, name) }
            </div>
        )
    }
}
  
export default Delete;