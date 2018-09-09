import React, { Component } from "react";
import { Col, Row, FormGroup, Label } from "reactstrap";
import { withApollo } from "react-apollo";
import * as Macros from "../../../components/macros";
import EventPicker from "./EventPicker";
class MacroConfig extends Component {
  _handleChange = e => {
    this.props.updateMacro("event", e.target.value);
  };
  _handleArg = (name, value) => {
    let { args } = this.props;
    args = JSON.parse(args) || {};
    args[name] = value;
    // Stringify it so it can be sent to the server
    this.props.updateMacro("args", JSON.stringify(args));
  };
  render() {
    const { event, client } = this.props;
    const args = JSON.parse(this.props.args);
    const EventMacro =
      Macros[event] ||
      (() => {
        return null;
      });
    return (
      <Row>
        <Col sm="12">
          {/* <FormGroup>
            <Label>Item Event</Label>
            <EventPicker event={event} handleChange={this._handleChange} />
          </FormGroup> */}
          {EventMacro && (
            <EventMacro
              updateArgs={this._handleArg}
              args={args || {}}
              client={client}
            />
          )}
        </Col>
      </Row>
    );
  }
}

export default withApollo(MacroConfig);
