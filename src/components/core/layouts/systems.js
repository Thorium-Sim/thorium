import React from "react";
import { Container } from "reactstrap";
import SystemsConfig from "../../../containers/FlightDirector/SimulatorConfig/config/Systems";

const SystemsCore = props => {
  return (
    <Container fluid className="config-container">
      <SystemsConfig selectedSimulator={props.simulator} />
    </Container>
  );
};
export default SystemsCore;
