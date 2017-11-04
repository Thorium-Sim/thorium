import React, { Component } from "react";
import SoundPlayer from "../../generic/SoundPlayer";
class SoundsTester extends Component {
  state = { currentSound: null };
  playSound = asset => {
    console.log(asset);
  };
  render() {
    if (this.props.data.loading) return null;
    const { assetFolders } = this.props.data;
    const sounds = assetFolders[0].containers;
    return (
      <div>
        <h1>Sound Player</h1>
        <ul>
          {sounds.map(s => (
            <li key={s.id} onClick={() => this.playSound(s.fullPath)}>
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const SOUNDS_QUERY = gql`
  query Sounds($simulatorId: ID, $names: [String]) {
    assetFolders(names: $names) {
      id
      name
      containers {
        id
        name
        fullPath
      }
    }
  }
`;

export default graphql(SOUNDS_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id,
      names: ["Sounds"]
    }
  })
})(withApollo(SoundsTester));
