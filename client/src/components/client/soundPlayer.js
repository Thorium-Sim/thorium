import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import playSound from "../generic/SoundPlayer";

const QUERY = gql`
  query Ambiance($id: String!) {
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
    return (
      <div className="keyboard-holder">
        <FormattedMessage id="sound-player" defaultMessage="Sound Player" />
      </div>
    );
  }
}

export default withApollo(playSound(SoundPlayer));
