import React from "react";
import Status from "../../views/Status";
import { Container } from "reactstrap";
const ShipStatus = props => {
  console.log(props);
  return (
    <Container fluid style={{ paddingTop: "100px" }}>
      <Status {...props} clientObj={{}} viewscreen />
    </Container>
  );
};

export default ShipStatus;
