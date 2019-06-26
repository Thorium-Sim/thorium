import React, { Component } from "react";
import { Container, Row, Col } from "helpers/reactstrap";
import gql from "graphql-tag.macro";

import StealthBoard from "../../views/StealthField/stealthBoard";

import StealthAnimation from "../../views/StealthField/stealthAnimation";

export default class StealthField extends Component {
  scene = null;
  mouseUp = which => level => {
    const { id } = this.props;
    const mutation = gql`
      mutation StealthQuadrant($id: ID, $which: String, $value: Float) {
        setStealthQuadrant(id: $id, which: $which, value: $value)
      }
    `;
    const variables = {
      id,
      which,
      value: Math.round(level * 20) / 20
    };
    return this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const {
      id,
      state,
      displayName,
      activated,
      systems,
      simulator
    } = this.props;
    return (
      <Container
        fluid
        className="card-stealthField viewscreen-stealth flex-column"
      >
        <Row className="stealth-row">
          <Col sm="3" />
          <Col sm="6">
            <h1>{displayName} Monitoring</h1>
            <div className="stealth" style={{ transform: "rotate(360deg)" }}>
              <div
                alt="ship"
                style={{
                  width: "100%",
                  height: "30vh",
                  backgroundImage: `url("${`/assets/${
                    simulator.assets.side
                  }`}")`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
                draggable="false"
              />
              <StealthAnimation
                id={id}
                activated={activated}
                state={state}
                src={`/assets/${simulator.assets.side}`}
              />
            </div>
          </Col>
          <Col sm="3" />
        </Row>
        <StealthBoard systems={systems} state={state} />
      </Container>
    );
  }
}
