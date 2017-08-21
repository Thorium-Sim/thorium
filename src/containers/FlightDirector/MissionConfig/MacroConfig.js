import React, { Component } from "react";
import { Col, Row, FormGroup, Label } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
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
    if (this.props.data.loading) return null;
    const data = this.props.data.__schema.mutationType.fields;
    const { event, client } = this.props;
    const args = JSON.parse(this.props.args);
    const EventMacro = Macros[this.props.event] || (() => {});
    return (
      <Row>
        <Col sm="12">
          <FormGroup>
            <Label>Item Event</Label>
            <select
              value={event}
              onChange={this._handleChange}
              name="mutations"
              className="c-select form-control"
            >
              <option>Select an event</option>
              {data
                .filter(mutation => {
                  return mutation.description.substr(0, 5) === "Macro";
                })
                .map(type => {
                  return (
                    <option key={type.name} value={type.name}>
                      {type.description.replace("Macro: ", "")}
                    </option>
                  );
                })}
            </select>
          </FormGroup>
          {event &&
            <EventMacro
              updateArgs={this._handleArg}
              args={args || {}}
              client={client}
            />}
        </Col>
      </Row>
    );
  }
}

const MacroConfigQuery = gql`
  query IntrospectionQuery {
    __schema {
      mutationType {
        name
        description
        fields {
          name
          description
          isDeprecated
          deprecationReason
          args {
            name
            description
            defaultValue
          }
        }
      }
    }
  }
`;

export default graphql(MacroConfigQuery, {})(withApollo(MacroConfig));
