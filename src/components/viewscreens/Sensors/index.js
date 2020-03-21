import React from "react";
import SensorsGrid from "components/views/Sensors";
import {Container} from "helpers/reactstrap";
const Sensors = props => {
  return (
    <Container fluid style={{paddingTop: "100px"}}>
      <SensorsGrid {...props} clientObj={{}} station={{cards: []}} viewscreen />
    </Container>
  );
};

export default Sensors;
