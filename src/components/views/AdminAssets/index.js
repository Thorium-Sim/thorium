import React from "react";
import FileExplorer from "../TacticalMap/fileExplorer";
import { Row, Col } from "reactstrap";
const Assets = () => {
  return (
    <Row>
      <Col sm={8} style={{ height: "80vh" }}>
        <FileExplorer
          config
          directory="/"
          selectedFiles={[]}
          onClick={(e, container) => {}}
        />
      </Col>
    </Row>
  );
};

export default Assets;
