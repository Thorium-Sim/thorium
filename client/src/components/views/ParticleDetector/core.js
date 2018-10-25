import React, { Component } from "react";
import { Button } from "reactstrap";
import ParticleDetectorCore from "./particleDetectorCore";
import "./style.scss";

const Components = {
  particle: ParticleDetectorCore
};
class AlternateSensorsCore extends Component {
  state = { which: "particle" };
  render() {
    const { which } = this.state;
    const Comp = Components[which];
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ display: "flex" }}>
          <Button
            color="info"
            size="sm"
            style={{ flex: 1 }}
            onClick={() => this.setState({ which: "particle" })}
            active={which === "particle"}
          >
            Particle
          </Button>
          <Button
            color="primary"
            size="sm"
            style={{ flex: 1 }}
            onClick={() => this.setState({ which: "science" })}
            active={which === "science"}
            disabled
          >
            Science
          </Button>
          <Button
            color="warning"
            size="sm"
            style={{ flex: 1 }}
            onClick={() => this.setState({ which: "defense" })}
            active={which === "defense"}
            disabled
          >
            Defense
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <Comp {...this.props} />
        </div>
      </div>
    );
  }
}
export default AlternateSensorsCore;
