import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { withApollo } from "react-apollo";
import * as Macros from "../../../components/macros";
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
