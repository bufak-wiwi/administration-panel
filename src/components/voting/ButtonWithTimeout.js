import React, { Component } from 'react';
import { Button } from 'reactstrap';


class ButtonWithTimeout extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isButtonDisabled: false
        }
    }

    componentWillUnmount() {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
      }

    onClick(onClick, timeout) {
        this.setState({
            isButtonDisabled: true
        });
        onClick()
        // store timeout and cancel on unmounting
        this.timeout = setTimeout(function() {
            this.setState({ isButtonDisabled: false })
            this.timeout = null
        }.bind(this), timeout)
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