import React from "react";
import Assets from "../../components/views/AdminAssets";
import { Container } from "reactstrap";

export default props => {
  return (
    <Container className="asset-config">
      <Assets {...props} />
    </Container>
  );
};
