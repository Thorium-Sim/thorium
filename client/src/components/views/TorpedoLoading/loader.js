import React, { Component } from "react";
import gql from "graphql-tag";
import DamageOverlay from "../helpers/DamageOverlay";
import TorpedoPick from "./picker";
import TorpedoTube from "./tube";

export default class TorpedoLoader extends Component {
  constructor(props) {
    super(props);
    let type = "other";
    let torpState = props.torpedo.state;
    if (props.torpedo.loaded !== "false") {
      const loadedTorp = props.torpedo.inventory.find(
        t => t.id === props.torpedo.loaded
      );
      if (loadedTorp) {
        type = loadedTorp.type;
      } else {
        type = null;
        torpState = false;
      }
    }
    this.state = {
      torpedoState: torpState,
      torpedoType: type,
      enabled: true,
      screen: "TorpedoTube"
    };
  }
  static getDerivedStateFromProps(props, state) {
    // Update the state based on the props
    let torpedo = props.torpedo;
    let torpState = torpedo.state;
    let type = state.torpedoType;
    if (torpedo.loaded !== "false") {
      const loadedTorp = torpedo.inventory.find(t => t.id === torpedo.loaded);
      if (loadedTorp) {
        type = loadedTorp.type;
      } else {
        type = null;
        torpState = false;
      }
    }
    return {
      torpedoState: torpState,
      torpedoType: type
    };
  }

  updateScreen(screen) {
    this.setState({
      screen
    });
  }
  loadTorpedo(which) {
    const torpedo = this.props.torpedo;
    const mutation = gql`
      mutation loadWarhead($id: ID!, $warheadId: ID!) {
        torpedoLoadWarhead(id: $id, warheadId: $warheadId)
      }
    `;
    const variables = {
      id: torpedo.id,
      warheadId: which
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      enabled: false
    });
    //Reenable the buttons
    setTimeout(() => {
      this.setState({
        enabled: true
      });
    }, 4000);
    this.updateScreen("TorpedoTube");
  }
  unloadTorpedo() {
    const torpedo = this.props.torpedo;
    const mutation = gql`
      mutation unloadWarhead($id: ID!) {
        torpedoUnload(id: $id)
      }
    `;
    const variables = {
      id: torpedo.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      enabled: false
    });
    //Reenable the buttons
    setTimeout(() => {
      this.setState({
        enabled: true
      });
    }, 4000);
  }
  fireTorpedo() {
    const torpedo = this.props.torpedo;
    const mutation = gql`
      mutation fireWarhead($id: ID!) {
        torpedoFire(id: $id)
      }
    `;
    const variables = {
      id: torpedo.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      enabled: false
    });
    //Reenable the buttons
    setTimeout(() => {
      this.setState({
        enabled: true
      });
    }, 4000);
  }
  render() {
    const components = { TorpedoTube, TorpedoPick };
    const torpedo = this.props.torpedo;
    return (
      <div
        className="torpedo-loader"
        style={{
          gridColumn: `1/ span 2`,
          gridRow: `1/ span 2`
        }}
      >
        <DamageOverlay
          system={torpedo}
          message={`${torpedo.name} Offline`}
          style={{
            height: "250px",
            width: "500px"
          }}
        />
        <h3 className="text-center">{torpedo.name}</h3>
        {Object.keys(components)
          .map(compName => {
            const Comp = components[compName];
            if (this.state.screen === compName) {
              return (
                <Comp
                  key={Comp.name}
                  {...this.state}
                  targeting={this.props.targeting}
                  inventory={torpedo.inventory}
                  loadTorpedo={this.loadTorpedo.bind(this)}
                  unloadTorpedo={this.unloadTorpedo.bind(this)}
                  updateScreen={this.updateScreen.bind(this)}
                  fireTorpedo={this.fireTorpedo.bind(this)}
                />
              );
            }
            return null;
          })
          .filter(a => a)}
      </div>
    );
  }
}
