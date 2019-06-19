import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { Table } from "helpers/reactstrap";
import { graphql, withApollo } from "react-apollo";
import { InputField } from "../../generic/core";
import SubscriptionHelper from "helpers/subscriptionHelper";
const HEAT_SUB = gql`
  subscription SystemHeatUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId, heat: true) {
      id
      name
      heat
      heatRate
      coolant
    }
  }
`;
const COOLANT_SUB = gql`
  subscription Coolant($simulatorId: ID!) {
    coolantUpdate(simulatorId: $simulatorId) {
      id
      coolant
    }
  }
`;
const COOLANT_SYSTEM_SUB = gql`
  subscription CoolanSystemUpdate($simulatorId: ID!) {
    coolantSystemUpdate(simulatorId: $simulatorId) {
      systemId
      coolant
    }
  }
`;
class HeatCore extends Component {
  updateHeat = (id, heat) => {
    const mutation = gql`
      mutation SystemHeat($id: ID!, $heat: Float) {
        addHeat(id: $id, heat: $heat)
      }
    `;
    const variables = {
      id,
      heat
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  updateRate = (id, rate) => {
    const mutation = gql`
      mutation SystemHeat($id: ID!, $rate: Float) {
        setHeatRate(id: $id, rate: $rate)
      }
    `;
    const variables = {
      id,
      rate
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  updateCoolant = (id, coolant) => {
    const mutation = gql`
      mutation AddCoolant($id: ID!, $coolant: Float!) {
        addCoolant(id: $id, coolant: $coolant)
      }
    `;
    const variables = { id, coolant };
    this.props.client.mutate({ mutation, variables });
  };
  updateTank = coolant => {
    if (!this.props.data.coolant[0]) return;
    const { id } = this.props.data.coolant[0];
    const mutation = gql`
      mutation Coolant($id: ID!, $coolant: Float!) {
        setCoolantTank(id: $id, coolant: $coolant)
      }
    `;
    const variables = { id, coolant };
    this.props.client.mutate({ mutation, variables });
  };
  render() {
    if (this.props.data.loading || !this.props.data.systems) return null;
    const { systems } = this.props.data;
    const coolant = this.props.data.coolant[0];
    return (
      <div className="core-heat">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: HEAT_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  systems: subscriptionData.data.systemsUpdate
                });
              }
            })
          }
        />
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: COOLANT_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  coolant: subscriptionData.data.coolantUpdate
                });
              }
            })
          }
        />
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: COOLANT_SYSTEM_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  systems: previousResult.systems.map(s => ({
                    ...s,
                    coolant: subscriptionData.data.coolantSystemUpdate.find(
                      sys => sys.systemId === s.id
                    ).coolant
                  }))
                });
              }
            })
          }
        />
        <Table size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Heat</th>
              <th>Rate</th>
              <th>Coolant</th>
            </tr>
          </thead>
          <tbody>
            {systems.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>
                  <InputField
                    prompt={`What do you want to change the heat of ${
                      s.name
                    } to?`}
                    alert={s.heat > 0.9}
                    onClick={value => this.updateHeat(s.id, value / 100)}
                  >
                    {Math.round(s.heat * 100)}
                  </InputField>
                </td>
                <td>
                  <InputField
                    prompt={`What do you want to change the rate of ${
                      s.name
                    } to?`}
                    onClick={value => this.updateRate(s.id, value)}
                  >
                    {s.heatRate}
                  </InputField>
                </td>
                <td>
                  <InputField
                    prompt={`What do you want to change the coolant of ${
                      s.name
                    } to?`}
                    onClick={value => this.updateCoolant(s.id, value / 100)}
                  >
                    {Math.round(s.coolant * 100)}
                  </InputField>
                </td>
              </tr>
            ))}
            {coolant && (
              <tr>
                <td>Coolant Tank</td>
                <td>
                  <InputField
                    prompt={`What do you want to change the coolant tank to?`}
                    onClick={value =>
                      this.updateCoolant(coolant.id, value / 100)
                    }
                  >
                    {Math.round(coolant.coolant * 100)}
                  </InputField>
                </td>
                <td />
                <td />
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

const HEAT_QUERY = gql`
  query SystemHeat($simulatorId: ID!) {
    systems(simulatorId: $simulatorId, heat: true) {
      id
      name
      heat
      heatRate
      coolant
    }
    coolant(simulatorId: $simulatorId) {
      id
      coolant
    }
  }
`;

export default graphql(HEAT_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(HeatCore));
