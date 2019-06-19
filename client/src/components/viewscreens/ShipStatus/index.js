import React from "react";
import Status from "components/views/Status";
import { Container } from "helpers/reactstrap";
const ShipStatus = props => {
  return (
    <Container fluid style={{ paddingTop: "100px" }}>
      <Status {...props} clientObj={{}} viewscreen />
    </Container>
  );
};

export default ShipStatus;
