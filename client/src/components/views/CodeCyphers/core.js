import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { TypingField } from "../../generic/core";
import { cypherMap } from "./index";
import Printable from "helpers/printable";

//var greekUtils = require("greek-utils");
const greekUtils = {
  toGreek: a => a
};
// Control what codes are available
// Code and print encoded messages
class CypherCore extends Component {
  state = { message: "" };
  sendMessage = () => {
    setTimeout(() => {
      window.print();
    }, 1000);
  };
  render() {
    return (
      <Container style={{ height: "100%" }} className="core-codeCyphers">
        <Row style={{ height: "100%" }}>
          <Col sm={12}>
            <TypingField
              style={{ height: "100%", textAlign: "left" }}
              controlled
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
            />
          </Col>
          <Col sm={6}>
            <select
              className="btn btn-warning btn-block btn-sm"
              value={this.state.cypher || "nothing"}
              onChange={e => this.setState({ cypher: e.target.value })}
            >
              <option disabled value="nothing">
                Select a cypher
              </option>
              {Object.keys(cypherMap).map(c => (
                <option value={c} key={c}>
                  {c} - {cypherMap[c]}
                </option>
              ))}
            </select>
          </Col>
          <Col sm={6}>
            <Button
              size="sm"
              color="success"
              onClick={this.sendMessage}
              disabled={!this.state.cypher || !this.state.message}
            >
              Print Message
            </Button>
          </Col>
        </Row>
        <Printable>
          <div className="cypher-printing">
            <h1>=== Intercepted Message ===</h1>
            <pre className={`${cypherMap[this.state.cypher]}`}>
              {cypherMap[this.state.cypher] === "Symbol"
                ? greekUtils.toGreek(this.state.message.toLowerCase())
                : this.state.message}
            </pre>
          </div>
        </Printable>
      </Container>
    );
  }
}

export default CypherCore;
