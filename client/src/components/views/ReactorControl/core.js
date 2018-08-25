import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { InputField, OutputField } from "../../generic/core";
import { graphql, withApollo, Mutation } from "react-apollo";
import { Container, Row, Col, Button, Input, Progress } from "reactstrap";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import { Duration } from "luxon";
import { titleCase } from "change-case";

import "./style.scss";

function parseDepletion(time) {
  return Object.entries(
    Duration.fromObject({
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: Math.round(time)
    })
      .normalize()
      .toObject()
  )
    .filter(t => t[1] !== 0)
    .map(t => `${t[1]} ${titleCase(t[0])}`)
    .join(", ");
}
const REACTOR_SUB = gql`
  subscription ReactorsUpdate($simulatorId: ID!) {
    reactorUpdate(simulatorId: $simulatorId) {
      id
      type
      name
      heat
      heatRate
      model
      coolant
      damage {
        damaged
      }
      ejected
      externalPower
      efficiency
      efficiencies {
        label
        color
        efficiency
      }
      displayName
      powerOutput
      batteryChargeRate
      batteryChargeLevel
      depletion
      # For Dilithium Stress
      alphaLevel
      betaLevel
      alphaTarget
      betaTarget
    }
  }
`;

class ReactorControl extends Component {
  setEfficiency = e => {
    const { reactors } = this.props.data;
    const reactor = reactors.find(r => r.model === "reactor");
    if (parseFloat(e) === reactor.efficiency) {
      e = parseFloat(
        window.prompt(
          "What would you like the reactor efficiency to be?",
          reactor.efficiency
        )
      );
      if (!e && e !== 0) return;
    }
    const mutation = gql`
      mutation SetReactorEfficiency($id: ID!, $e: Float) {
        reactorChangeEfficiency(id: $id, efficiency: $e)
      }
    `;
    const variables = {
      id: reactor.id,
      e: e === "external" ? null : e
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  setPowerLevel = e => {
    if ((!e || !parseFloat(e)) && e !== "0") return;
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
      e: e / 1000
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  updateHeat = heat => {
    const { reactors } = this.props.data;
    const reactor = reactors.find(r => r.model === "reactor") || {};
    const mutation = gql`
      mutation SystemHeat($id: ID!, $heat: Float) {
        addHeat(id: $id, heat: $heat)
      }
    `;
    const variables = {
      id: reactor.id,
      heat: heat / 100
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  setHeatRate = value => {
    const { reactors } = this.props.data;
    const reactor = reactors.find(r => r.model === "reactor") || {};
    const mutation = gql`
      mutation SetHeatRate($id: ID!, $rate: Float!) {
        setHeatRate(id: $id, rate: $rate)
      }
    `;
    const variables = {
      id: reactor.id,
      rate: value
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  calcStressLevel = () => {
    const { reactors } = this.props.data;
    if (!reactors[0]) return;
    const { alphaTarget, betaTarget, alphaLevel, betaLevel } = reactors[0];
    const alphaDif = Math.abs(alphaTarget - alphaLevel);
    const betaDif = Math.abs(betaTarget - betaLevel);
    const stressLevel = alphaDif + betaDif > 100 ? 100 : alphaDif + betaDif;
    return stressLevel;
  };
  render() {
    if (this.props.data.loading || !this.props.data.reactors) return null;
    const { reactors } = this.props.data;
    const reactor = reactors.find(r => r.model === "reactor");
    const battery = reactors.find(r => r.model === "battery");
    if (!reactor && !battery) return <p>No Reactor</p>;
    const efficiencies = reactor
      ? reactor.efficiencies.concat().sort((a, b) => {
          if (a.efficiency > b.efficiency) return -1;
          if (a.efficiency < b.efficiency) return 1;
          return 0;
        })
      : [];
    return (
      <Container className="reactor-control-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: REACTOR_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  reactors: subscriptionData.data.reactorUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm={12}>
            {reactor && (
              <Fragment>
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
                  value={
                    reactor.externalPower ? "external" : reactor.efficiency
                  }
                >
                  {efficiencies.map(e => (
                    <option
                      key={e.label}
                      value={
                        e.efficiency || e.efficiency === 0
                          ? e.efficiency
                          : "external"
                      }
                    >
                      {e.label}{" "}
                      {(e.efficiency || e.efficiency === 0) &&
                        `- ${e.efficiency * 100}%`}
                    </option>
                  ))}
                  <option disabled>----------</option>
                  <option value={reactor.efficiency}>
                    Force - {reactor.efficiency * 100}%
                  </option>
                </Input>
                <p>Heat Rate:</p>
                <Input
                  size="sm"
                  type="select"
                  onChange={evt => this.setHeatRate(evt.target.value)}
                  value={reactor.heatRate}
                >
                  <option value={1.5}>Fast</option>
                  <option value={1}>Normal</option>
                  <option value={0.5}>Slow</option>
                  <option value={0}>Stop</option>
                  <option value={-1}>Reverse</option>
                </Input>
                <p>Reactor Heat:</p>
                <InputField
                  prompt="What is the new reactor heat?"
                  onClick={this.updateHeat}
                >
                  {Math.round(reactor.heat * 1000) / 10}%
                </InputField>
              </Fragment>
            )}
            {battery && (
              <Fragment>
                {" "}
                <p>Battery Output:</p>
                <InputField
                  prompt="What is the new battery charge level?"
                  promptValue={battery.batteryChargeLevel * 100}
                  onClick={this.setChargeLevel}
                >
                  {Math.round(battery.batteryChargeLevel * 100)}%
                </InputField>
                <p>Battery Rate:</p>
                <InputField
                  prompt="What is the new battery charge rate?"
                  onClick={this.setChargeRate}
                >
                  {battery.batteryChargeRate * 1000}
                </InputField>
                <p>Battery Depletion Time:</p>
                <OutputField>{parseDepletion(battery.depletion)}</OutputField>
              </Fragment>
            )}

            {this.calcStressLevel() ? (
              <Fragment>
                <p>Dilithium Stress:</p>
                <div style={{ display: "flex" }}>
                  <Progress style={{ flex: 1 }} value={this.calcStressLevel()}>
                    {Math.round(this.calcStressLevel())}%
                  </Progress>
                  <Mutation
                    mutation={gql`
                      mutation FluxDilithium($id: ID!) {
                        fluxDilithiumStress(id: $id)
                      }
                    `}
                    variables={{ id: reactors[0].id }}
                  >
                    {action => (
                      <Button
                        style={{ width: "20px" }}
                        color="danger"
                        onClick={action}
                      />
                    )}
                  </Mutation>
                </div>
              </Fragment>
            ) : null}
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
      heatRate
      model
      coolant
      damage {
        damaged
      }
      externalPower
      ejected
      efficiency
      efficiencies {
        label
        color
        efficiency
      }
      displayName
      powerOutput
      batteryChargeRate
      batteryChargeLevel
      depletion
      # For Dilithium Stress
      alphaLevel
      betaLevel
      alphaTarget
      betaTarget
    }
  }
`;
export default graphql(REACTOR_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ReactorControl));
