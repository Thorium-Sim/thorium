import React from "react";
import Assets from "../../components/views/AdminAssets";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

export default () => {
  return (
    <Container className="asset-config">
      <h4>
        Asset Config{" "}
        <small>
          <Link to="/">Return to Main</Link>
        </small>
      </h4>
      <Assets />
    </Container>
  );
};
