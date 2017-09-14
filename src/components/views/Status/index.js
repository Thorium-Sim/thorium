import React from "react";
import { Container, Row, Col, Label, Input } from "reactstrap";
import { Asset } from "../../../helpers/assets";
import {
  Dots,
  Destination,
  Speed,
  Population,
  Coolant,
  Targeted
} from "./components";
import "./style.scss";

export default props => {
  return (
    <Container fluid className="status-card">
      <Row>
        <Col sm={3}>
          <Destination {...props} />
          <Speed {...props} />
          <Targeted {...props} />
          <Population {...props} />
          <Label>Radiation</Label>
          <Dots level={0.5} />
          <Label>Water</Label>
          <Dots level={0.5} color={"rgb(0,128,255)"} />
          <Label>Battery</Label>
          <Dots level={0.5} color={"goldenrod"} />
          <Coolant {...props} />
        </Col>
        <Col sm={6}>
          <Asset asset="/Ship Views/Top" simulatorId={props.simulator.id}>
            {({ src }) => <img className="status-ship" src={src} />}
          </Asset>
        </Col>
        <Col sm={3}>
          <Label>Damaged Systems</Label>
          <Input type="textarea" />
        </Col>
      </Row>
    </Container>
  );
};
