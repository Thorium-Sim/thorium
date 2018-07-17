import React, { Component } from "react";
import uuid from "uuid";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Asset } from "../../../helpers/assets.js";

import withSound from "../../generic/SoundPlayer";
class SoundsTester extends Component {
  state = { currentSounds: [] };
  playSound = asset => {
    this.setState({
      currentSounds: this.state.currentSounds.concat({ id: uuid.v4(), asset })
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.assetFolders) return null;
    const { assetFolders } = this.props.data;
    const sounds = assetFolders[0].objects;
    return (
      <div>
        <h1>Sound Player</h1>
        <ul>
          {sounds.map(s => (
            <Asset asset={s.fullPath} key={s.id}>
              {({ src }) => (
                <li
                  onClick={() => {
                    this.props.playSound({ url: src });
                  }}
                >
                  {s.name}
                </li>
              )}
            </Asset>
          ))}
        </ul>
      </div>
    );
  }
}

const SOUNDS_QUERY = gql`
  query Sounds($names: [String]) {
    assetFolders(names: $names) {
      id
      name
      objects {
        id
        name
        fullPath
      }
    }
  }
`;

export default graphql(SOUNDS_QUERY, {
  options: () => ({
    variables: {
      names: ["Sounds"]
    }
  })
})(withApollo(withSound(SoundsTester)));
