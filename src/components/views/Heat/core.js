import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { InputField } from "../../generic/core";

const HEAT_SUB = gql`
  subscription SystemHeatUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId, heat: true) {
      id
      name
      heat
    }
  }
`;

class HeatCore extends Component {
  subscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: HEAT_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            systems: subscriptionData.data.systemsUpdate
          });
        }
      });
    }
  }
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
  render() {
    if (this.props.data.loading) return null;
    const { systems } = this.props.data;
    return (
      <div className="core-heat">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Heat</th>
            </tr>
          </thead>
          <tbody>
            {systems.map(s =>
              <tr key={s.id}>
                <td>
                  {s.name}
                </td>
                <td>
                  <InputField
                    prompt={`What do you want to change the heat of ${s.name} to?`}
                    onClick={value => this.updateHeat(s.id, value / 100)}
                  >
                    {Math.round(s.heat * 100)}
                  </InputField>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const HEAT_QUERY = gql`
  query SystemHeat($simulatorId: ID) {
    systems(simulatorId: $simulatorId, heat: true) {
      id
      name
      heat
    }
  }
`;

export default graphql(HEAT_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(HeatCore));
