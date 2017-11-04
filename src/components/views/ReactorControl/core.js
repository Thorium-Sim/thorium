import React, { Component } from "react";
import gql from "graphql-tag";
import { InputField } from "../../generic/core";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Input } from "reactstrap";

import "./style.css";

const REACTOR_SUB = gql`
  subscription ReactorsUpdate($simulatorId: ID!) {
    reactorUpdate(simulatorId: $simulatorId) {
      id
      type
      name
      heat
      model
      coolant
      damage {
        damaged
      }
      ejected
      efficiency
      displayName
      powerOutput
      batteryChargeRate
      batteryChargeLevel
    }
  }
`;

class ReactorControl extends Component {
  constructor(props) {
    super(props);
    this.internalSub = null;
    this.systemSub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: REACTOR_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            reactors: subscriptionData.reactorUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.internalSub && this.internalSub();
  }
  setEfficiency = e => {
    if (!e) return;
    const { reactors } = this.props.data;
    const reactor = reactors.find(r => r.model === "reactor");
    const mutation = gql`
      mutation SetReactorEfficiency($id: ID!, $e: Float) {
        reactorChangeEfficiency(id: $id, efficiency: $e)
      }
    `;
    const variables = {
      id: reactor.id,
      e
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  setPowerLevel = e => {
    if (!e || !parseFloat(e)) return;
    const { reactors } = this.props.data;
    const reactor = reactors.find(r => r.model === "reactor");
    const mutation = gql`
      mutation ReactorPowerLevel($id: ID!, $e: Int!) {
        reactorChangeOutput(id: $id, output: $e)
      }
    `;
    const variables = {
      id: reactor.id,
      e
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  setHeat = e => {
    return;
    /*const { reactors } = this.props.data;
    const reactor = reactors.find(r => r.model === "reactor");
    const mutation = gql`
      mutation SetReactorEfficiency($id: ID!, $e: Float) {
        reactorChangeEfficiency(id: $id, efficiency: $e)
      }
    `;
    const variables = {
      id: reactor.id,
      e
    };
    this.props.client.mutate({
      mutation,
      variables
    });*/
  };
  setChargeLevel = e => {
    if (!e) return;
    const { reactors } = this.props.data;
    const battery = reactors.find(r => r.model === "battery");
    const mutation = gql`
      mutation BatteryChargeLevel($id: ID!, $e: Float!) {
        reactorBatteryChargeLevel(id: $id, level: $e)
      }
    `;
    const variables = {
      id: battery.id,
      e: e / 100
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  setChargeRate = e => {
    if (!e) return;
    const { reactors } = this.props.data;
    const battery = reactors.find(r => r.model === "battery");
    const mutation = gql`
      mutation BatteryChargeRate($id: ID!, $e: Float!) {
        reactorBatteryChargeRate(id: $id, rate: $e)
      }
    `;
    const variables = {
      id: battery.id,
      e: e / 100
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const { reactors } = this.props.data;
    const reactor = reactors.find(r => r.model === "reactor") || {};
    const battery = reactors.find(r => r.model === "battery") || {};
    if (!reactor) return <p>No Reactor</p>;
    const efficiencies = [
      {
        label: "Cruise",
        efficiency: 1
      },
      {
        label: "Silent Running",
        efficiency: 0.87
      },
      {
        label: "Reduced",
        efficiency: 0.5
      },
      {
        label: "Auxilliary",
        efficiency: 0.38
      },
      {
        label: "Minimal",
        efficiency: 0.27
      },
      {
        label: "Power Down",
        efficiency: 0
      },
      {
        label: "External Power"
      }
    ];
    return (
      <Container className="reactor-control-core">
        <Row>
          <Col sm={12}>
            <p>Reactor Output:</p>
            <InputField
              prompt="What is the new power output?"
              onClick={this.setPowerLevel}
            >
              {reactor.powerOutput}
            </InputField>
            <p>Reactor Efficiency:</p>
            <Input
              size="sm"
              type="select"
              onChange={evt => this.setEfficiency(evt.target.value)}
              value={reactor.efficiency}
            >
              {efficiencies.map(e => (
                <option key={e.label} value={e.efficiency}>
                  {e.label}
                </option>
              ))}
            </Input>
            <p>Reactor Heat:</p>
            <InputField prompt="What is the new reactor heat?">
              {reactor.heat}
            </InputField>
            <p>Battery Output:</p>
            <InputField
              prompt="What is the new battery charge level?"
              onClick={this.setChargeLevel}
            >
              {Math.round(battery.batteryChargeLevel * 100)}%
            </InputField>
            <p>Battery Rate:</p>
            <InputField
              prompt="What is the new battery charge rate?"
              onClick={this.setChargeRate}
            >
              {battery.batteryChargeRate * 100}
            </InputField>
          </Col>
        </Row>
      </Container>
    );
  }
}

const REACTOR_QUERY = gql`
  query Reactors($simulatorId: ID!) {
    reactors(simulatorId: $simulatorId) {
      id
      type
      name
      heat
      model
      coolant
      damage {
        damaged
      }
      ejected
      efficiency
      displayName
      powerOutput
      batteryChargeRate
      batteryChargeLevel
    }
  }
`;
export default graphql(REACTOR_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ReactorControl));
