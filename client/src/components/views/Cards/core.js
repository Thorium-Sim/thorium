import React from "react";
import { Table } from "reactstrap";
import gql from "graphql-tag.macro";
import { Query } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";

const fragment = gql`
  fragment CardData on Simulator {
    id
    stations {
      cards(showHidden: true) {
        name
        component
        hidden
      }
    }
  }
`;

const QUERY = gql`
  query Simulator($simulatorId: String!) {
    simulators(id: $simulatorId) {
      ...CardData
    }
  }
  ${fragment}
`;
const SUB = gql`
  subscription Simulators($simulatorId: ID!) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      ...CardData
    }
  }
  ${fragment}
`;

const CardsCore = ({ cards }) => {
  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Card Name</th>
          <th>Hidden</th>
        </tr>
      </thead>
      <tbody>
        {cards.map(c => (
          <tr key={`${c.station}-${c.name}`}>
            <td>{c.name}</td>
            <td>
              <input type="checkbox" checked={c.hidden} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const CardsData = props => {
  return (
    <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
      {({ loading, data, subscribeToMore }) => {
        const { simulators } = data;
        if (loading) return null;
        const simulator = simulators.find(s => s.id === props.simulator.id);
        const cards = simulator.stations.reduce(
          (acc, s) => acc.concat(s.cards.map(c => ({ ...c, station: s.name }))),
          []
        );
        return (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: SUB,
                variables: { simulatorId: props.simulator.id },
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    simulators: subscriptionData.data.simulatorsUpdate
                  });
                }
              })
            }
          >
            <CardsCore {...props} cards={cards} />
          </SubscriptionHelper>
        );
      }}
    </Query>
  );
};
export default CardsData;
