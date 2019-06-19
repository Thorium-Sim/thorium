import React, { Component } from "react";
import { Button } from "reactstrap";
import ParticleDetectorCore from "./particleDetectorCore";
import ProbeScienceCore from "../ProbeScience/core";

import "./style.scss";

const Components = {
  particle: ParticleDetectorCore,
  science: ProbeScienceCore
};
class AlternateSensorsCore extends Component {
  state = { which: "particle" };
  render() {
    const { which } = this.state;
    const Comp = Components[which];
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", height: "20px" }}>
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
