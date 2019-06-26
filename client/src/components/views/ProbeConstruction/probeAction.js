import React from "react";
import { Button, Col } from "helpers/reactstrap";
import Transitioner from "../helpers/transitioner";
import ProbeName from "./probeName";
import "./style.scss";

class ProbeAction extends Transitioner {
  render() {
    const {
      selectedProbeType,
      selectProbe,
      cancelProbe,
      probes,
      equipment,
      launchProbe
    } = this.props;
    return (
      <Col sm={{ size: 4 }} className="flex-column probeAction">
        <ProbeName
          probes={probes}
          network={probes.probes
            .filter(p =>
              p.equipment.find(e => e.id === "probe-network-package")
            )
            .map(p => parseInt(p.name, 10))}
          equipment={equipment}
          launchProbe={launchProbe}
        />
        <div>
          <Button
            block
            color="warning"
            onClick={selectProbe.bind(this, selectedProbeType)}
          >
            Reconfigure Probe
          </Button>
          <Button block color="danger" onClick={cancelProbe}>
            Cancel Probe
          </Button>
        </div>
      </Col>
    );
  }
}

export default ProbeAction;
