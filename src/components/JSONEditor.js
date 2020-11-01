import React, { Component } from 'react';
import {
    CardBody,
    Row,
    Col,
    Card,
    Input,
} from 'reactstrap'
import IconButton from '@material-ui/core/IconButton';
import { MdDelete, MdAdd } from 'react-icons/md';
import { isValidJsonString } from '../utils/functions';

class JSONEditor extends Component {
    constructor() {
        super()
        this.state = {
            json: {},
            mounted: false
        }
    }

    componentDidMount() {
        const { value } = this.props
        if (value && isValidJsonString(value)) {
            this.setState({json: JSON.parse(value), mounted: true})
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({json: JSON.parse(this.props.value), mounted: true})
        }
    }

    updateJSONKey(e, entry) {
        return this.props.onChange(JSON.stringify(this.changeKey(this.state.json, entry[0], e.currentTarget.value)))
    }

    updateJSONValue(e, key) {
        this.setState({json: {...this.state.json, [key]: e.currentTarget.value}})
        return this.props.onChange(JSON.stringify({...this.state.json, [key]: e.currentTarget.value}))
    }

    deleteJSONPair(key) {
        const {[key]: _, ...rest} = this.state.json;
        return this.props.onChange(JSON.stringify({...rest}))
    }

    changeKey(oldObject, oldKey, newKey) {
        var newObject = {};
        for (var key in oldObject)
        {
        if (key === oldKey) newObject[newKey] = oldObject[oldKey];
        else newObject[key] = oldObject[key];
        }
        return newObject;
    }

  renderJsonEntry(entry, index) {
    const { disabled } = this.props;
    const key = entry[0];
    return (
        <Row key={"json-" + index}>
            <Row style={{flex: 1}}>
                <Col xs="12" md="3">
                    <Input
                        type="text"
                        disabled={disabled}
                        value={entry[0]}
                        onChange={(e) => this.updateJSONKey(e, entry)}
                    />
                </Col>
                <Col xs="12" md="9">
                    <Input
                        type="textarea"
                        disabled={disabled}
                        value={entry[1]}
                        onChange={(e) => this.updateJSONValue(e, key)}
                    />
                </Col>
            </Row>
            { !disabled && 
                <IconButton aria-label="delete" style={{margin: 5}} onClick={() => this.deleteJSONPair(key)}>
                    <MdDelete />
                </IconButton>
            }
        </Row>
    )
  }

  render() {
    const { json } = this.state
    const { disabled } = this.props;
    return (
        <Card>
            <CardBody>
                <Row>
                    <Col xs="12" md="3" style={{textAlign: "center"}}>Key</Col>
                    <Col xs="12" md="9" style={{textAlign: "center"}}>Value</Col>
                </Row>
            { Object.entries(json).map((entry, i) => this.renderJsonEntry(entry, i))}
            { !disabled && 
                <IconButton aria-label="delete" onClick={() => this.setState({json: {...json, newKey: ""}})}>
                    <MdAdd />
                </IconButton>
            }
            </CardBody>
        </Card>
    )
  }
}

export default JSONEditor;