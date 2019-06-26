import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { graphql, compose } from "react-apollo";
import { Container, Col, Row } from "helpers/reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";

const SPEEDCHANGE_SUB = gql`
  subscription SpeedChanged($simulatorId: ID) {
    engineUpdate(simulatorId: $simulatorId) {
      id
      name
      speeds {
        text
        number
        velocity
      }
      velocity
      heat
      speed
      on
      stealthFactor
    }
  }
`;

class EngineCoreView extends Component {
  updateSpeed(e) {
    const id = e.target.value.split("$")[0];
    const speed = parseInt(e.target.value.split("$")[1], 10) + 1;
    if (id === "Full Stop") {
      //Pick the first engine
      this.props.setSpeed({
        id: this.props.data.engines[0].id,
        speed: -1,
        on: false
      });
    } else {
      this.props.setSpeed({ id: id, speed: speed, on: true });
    }
  }
  getCurrentSpeed() {
    if (!this.props.data.engines) return;
    if (!this.props.data.engines[0]) return;
    const velocity = this.props.data.engines[0].velocity;
    const speed = this.props.data.engines
      .reduce((prev, next) => {
        return prev.concat(next.speeds);
      }, [])
      .reduce((prev, next) => {
        if (next.velocity > velocity) return prev;
        if (!prev) return next;
        if (next.velocity > prev.velocity) return next;
        return prev;
      }, null);
    return speed ? speed.text : "Full Stop";
  }
  render() {
    let speedList = [];
    let onEngine = "Full Stop";
    if (!this.props.data.loading) {
      this.props.data.engines &&
        this.props.data.engines.forEach(engine => {
          if (engine.on) onEngine = `${engine.id}$${engine.speed - 1}`;
          speedList.push({ disabled: true, text: engine.name });
          engine.speeds.forEach((speed, index) => {
            speedList.push({ text: speed.text, engineId: engine.id, index });
          });
        });
    }
    return this.props.data.loading || !this.props.data.engines ? (
      <span>"Loading..."</span>
    ) : (
      <Container>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SPEEDCHANGE_SUB,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  engines: previousResult.engines.map(engine => {
                    if (engine.id === subscriptionData.data.engineUpdate.id) {
                      return Object.assign(
                        {},
                        engine,
                        subscriptionData.data.engineUpdate
                      );
                    }
                    return engine;
                  })
                });
              }
            })
          }
        />
        <Row>
          <Col sm={6}>
            {speedList.length > 0 ? (
              <select value={onEngine} onChange={this.updateSpeed.bind(this)}>
                <option>Full Stop</option>
                {speedList.map((output, index) => {
                  return (
                    <option
                      key={index}
                      value={`${output.engineId}$${output.index}`}
                      disabled={output.disabled}
                    >
                      {output.text}
                    </option>
                  );
                })}
              </select>
            ) : (
              "No engines"
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Velocity</p>
            {this.getCurrentSpeed()} -{" "}
            {this.props.data.engines &&
              this.props.data.engines[0] &&
              this.props.data.engines[0].velocity &&
              this.props.data.engines[0].velocity.toLocaleString &&
              `${this.props.data.engines[0].velocity.toLocaleString()} km/s`}
          </Col>
        </Row>
      </Container>
    );
  }
}

const ENGINE_QUERY = gql`
  query getEngines($simulatorId: ID!) {
    engines(simulatorId: $simulatorId) {
      id
      name
      speeds {
        text
        number
        velocity
      }
      velocity
      heat
      speed
      on
      stealthFactor
    }
  }
`;

const SET_SPEED = gql`
  mutation setSpeed($id: ID!, $speed: Int!, $on: Boolean) {
    setSpeed(id: $id, speed: $speed, on: $on)
  }
`;

export default compose(
  graphql(ENGINE_QUERY, {
    options: ownProps => ({
      fetchPolicy: "cache-and-network",
      variables: { simulatorId: ownProps.simulator.id }
    })
  }),
  graphql(SET_SPEED, {
    name: "setSpeed",
    props: ({ setSpeed }) => ({
      setSpeed: props =>
        setSpeed({
          variables: Object.assign(props)
        })
    })
  })
)(EngineCoreView);
