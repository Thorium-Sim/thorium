import React from "react";
import {Row, Col} from "helpers/reactstrap";
import "./style.scss";

const ProbeDescription = ({description}) => {
  return (
    <Row className="probeDescription">
      <Col sm={{size: 6, offset: 3}}>
        <p>{description}</p>
      </Col>
    </Row>
  );
};

export default ProbeDescription;
