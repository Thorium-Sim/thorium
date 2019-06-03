import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import playSound from "../generic/SoundPlayer";
import Reset from "./reset";

const QUERY = gql`
  query Ambiance($id: ID!) {
    simulators(id: $id) {
      id
      ambiance {
        id
        name
        asset
        volume
        channel
        playbackRate
      }
    }
  }
`;
class SoundPlayer extends Component {
  componentDidMount() {
    this.props.client
      .query({
        query: QUERY,
        variables: { id: this.props.simulator.id }
      })
      .then(({ data: { simulators } }) => {
        const { ambiance } = simulators[0];
        ambiance.forEach(a => {
          this.props.playSound({
            ...a,
            looping: true,
            ambiance: true
          });
        });
      });
  }
  componentWillUnmount() {
    this.props.removeAllSounds(true);
  }
  render() {
    if (this.props.invisible)
      return (
        <Reset
          clientId={this.props.clientObj.id}
          station={{ name: "Sound", cards: [] }}
          reset={() => {
            this.props.removeAllSounds();
          }}
        />
      );
    return (
      <div className="keyboard-holder">
        <Reset
          clientId={this.props.clientObj.id}
          station={{ name: "Sound", cards: [] }}
          reset={() => {
            this.props.removeAllSounds();
          }}
        />
        <FormattedMessage id="sound-player" defaultMessage="Sound Player" />
      </div>
    );
  }
}

export default withApollo(playSound(SoundPlayer));
