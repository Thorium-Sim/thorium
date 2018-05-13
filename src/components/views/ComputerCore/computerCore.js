import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";

import Terminals from "./terminals";
import Users from "./users";
import Files from "./files";
import VirusScanner from "./virusScanner";

class ComputerCore extends Component {
  state = { currentView: "users" };
  componentDidMount() {
    this.sub = this.props.subscribe();
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  render() {
    const { selectedLevel, currentView } = this.state;
    return (
      <Container fluid className="card-computerCore">
        <Row>
          <Col sm={2}>
            <h4>Access Levels</h4>
            <ListGroup>
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <ListGroupItem
                    key={`level-${i}`}
                    className={selectedLevel === i + 1 ? "selected" : ""}
                    onClick={() => this.setState({ selectedLevel: i + 1 })}
                  >
                    Level {i + 1}
                  </ListGroupItem>
                ))}
            </ListGroup>
            <VirusScanner {...this.props} />
          </Col>
          <Col sm={6}>
            <Row>
              <Col sm={5}>
                <Button
                  block
                  active={currentView === "users"}
                  size="lg"
                  color="warning"
                  onClick={() => this.setState({ currentView: "users" })}
                >
                  Users
                </Button>
              </Col>
              <Col sm={{ size: 5, offset: 2 }}>
                <Button
                  block
                  active={currentView === "files"}
                  size="lg"
                  color="info"
                  onClick={() => this.setState({ currentView: "files" })}
                >
                  Files
                </Button>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                {currentView === "users" ? (
                  <Users {...this.props} selectedLevel={selectedLevel} />
                ) : (
                  <Files {...this.props} selectedLevel={selectedLevel} />
                )}
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <Terminals {...this.props} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ComputerCore;
