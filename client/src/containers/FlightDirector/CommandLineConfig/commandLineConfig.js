import React, { Component, Fragment } from "react";
import {
  Library,
  DiagramProvider,
  DiagramContext,
  Canvas,
  Config
} from "react-node-diagrams";
import {
  Col,
  Row,
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";
import "./components";

export default class CommandLineConfig extends Component {
  state = {};
  render() {
    const { commandLines } = this.props;
    const { selectedCommandLine } = this.state;
    return (
      <Container
        fluid
        style={{
          height: "calc(100vh - 60px)"
        }}
      >
        <DiagramProvider>
          <Row style={{ height: "100%" }}>
            <Col sm={3} style={{ height: "100%" }}>
              <ListGroup>
                {commandLines.map(c => (
                  <ListGroupItem
                    key={c.id}
                    active={c.id === selectedCommandLine}
                    onClick={() => this.setState({ selectedCommandLine: c.id })}
                  >
                    {c.name}
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Button color="success" size="sm" block>
                Add Command Line
              </Button>
              {selectedCommandLine && (
                <Fragment>
                  <Button color="danger" size="sm" block>
                    Remove Command Line
                  </Button>
                  <Button color="warning" size="sm" block>
                    Rename Command Line
                  </Button>
                </Fragment>
              )}
            </Col>
            <Col sm={3} style={{ height: "100%" }}>
              <DiagramContext.Consumer>
                {({ selectedComponent }) =>
                  selectedComponent ? <Config /> : <Library />
                }
              </DiagramContext.Consumer>
            </Col>
            <Col sm={6} style={{ height: "100%" }}>
              {" "}
              <Canvas />
            </Col>
          </Row>
        </DiagramProvider>
      </Container>
    );
  }
}
