import React, {Component} from "react";
import keycode from "keycode";
import {withApollo} from "react-apollo";
import gql from "graphql-tag.macro";
import SoundPlayer from "../../client/soundPlayer";

import "./style.scss";
import {ClientLighting} from "components/client/lighting";

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.keydown = e => {
      e.preventDefault();
      const {keyCode, code, shiftKey, metaKey, altKey, ctrlKey} = e;
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
          $keyCode: String!
          $meta: [String]!
        ) {
          triggerKeyboardAction(
            simulatorId: $simulatorId
            id: $id
            key: $key
            keyCode: $keyCode
            meta: $meta
          )
        }
      `;
      const variables = {
        simulatorId: props.simulator.id,
        id: props.keyboard,
        key: key || "",
        keyCode: code,
        meta,
      };
      props.client.mutate({
        mutation,
        variables,
      });
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keydown, true);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydown, true);
  }
  render() {
    const {clientObj} = this.props;
    return (
      <div className="keyboard-holder">
        Keyboard
        {clientObj.soundPlayer && (
          <div>
            <p>Sound Player</p>
            <SoundPlayer {...this.props} invisible />
          </div>
        )}
        <ClientLighting
          simulator={this.props.simulator}
          clientId={this.props.clientObj.id}
        />
      </div>
    );
  }
}

export default withApollo(Keyboard);
