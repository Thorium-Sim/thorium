import React, { Component } from "react";
import * as Components from "./components";
import {
  Container,
  Col,
  Row,
  Button,
  Card,
  CardBody
} from "helpers/reactstrap";

class ComponentLibrary extends Component {
  render() {
    const { shown, hide, mouseDown } = this.props;
    return (
      <Container className={`componentLibrary ${shown ? "shown" : ""}`}>
        <h1>Component Library</h1>
        <Button block size="sm" onClick={hide}>
          Hide
        </Button>
        <Row style={{ overflowY: "scroll", height: "80vh" }}>
          {Object.keys(Components).map(c => (
            <Col key={c} sm={6}>
              <ComponentArea
                name={c}
                Component={Components[c]}
                mouseDown={mouseDown}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
export default ComponentLibrary;

const ComponentArea = ({ Component, name, mouseDown }) => {
  return (
    <Card>
      <CardBody>
        <div
          className="componentHolder"
          onMouseDown={evt => mouseDown(evt, name)}
        >
          <Component edit={true} />
        </div>
        <label>{name}</label>
      </CardBody>
    </Card>
  );
};
