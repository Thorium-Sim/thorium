import React from "react";
import Assets from "../../components/views/AdminAssets";
import { Container } from "helpers/reactstrap";

export default props => {
  return (
    <Container className="asset-config">
      <Assets {...props} />
    </Container>
  );
};
