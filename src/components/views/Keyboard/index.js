import React, { Component } from "react";
import keycode from "keycode";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

import "./style.scss";

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.keydown = e => {
      e.preventDefault();
      const { keyCode, shiftKey, metaKey, altKey, ctrlKey } = e;
      const key = keycode(keyCode);
      const meta = [];
      if (shiftKey) meta.push("shift");
      if (metaKey) meta.push("command");
      if (altKey) meta.push("option");
      if (ctrlKey) meta.push("control");
      const mutation = gql`
        mutation TriggerKeyAction(
          $simulatorId: ID!
          $id: ID!
          $key: String!
          $meta: [String]!
        ) {
          triggerKeyboardAction(
            simulatorId: $simulatorId
            id: $id
            key: $key
            meta: $meta
          )
        }
      `;
      const variables = {
        simulatorId: props.simulator.id,
        id: props.keyboard,
        key,
        meta
      };
      props.client.mutate({
        mutation,
        variables
      });
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydown);
  }
  render() {
    return <div className="keyboard-holder">Keyboard</div>;
  }
}

export default withApollo(Keyboard);
