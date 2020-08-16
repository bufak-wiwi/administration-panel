import React, { Component } from 'react';
import { Button } from 'reactstrap';


class ButtonWithTimeout extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isButtonDisabled: false
        }
    }

    onClick(onClick, timeout) {
        this.setState({
            isButtonDisabled: true
        });
        onClick()
        setTimeout(() => this.setState({ isButtonDisabled: false }), timeout);
    }

    render() {
        const { text,  onClick, timeout, disabled, ...otherProps } = this.props
        return (
            <Button
                {...otherProps}
                onClick={() => this.onClick(onClick, timeout)}
                disabled={disabled || this.state.isButtonDisabled}
            >
                {text}
            </Button>
        )
    }
}

export default ButtonWithTimeout;