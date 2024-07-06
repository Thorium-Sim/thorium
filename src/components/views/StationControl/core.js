import { Query, useMutation } from "@apollo/client";
import React from "react";
import {Table} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
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

export const CARDS_CORE_QUERY = gql`
  query Simulator($simulatorId: ID!) {
    simulators(id: $simulatorId) {
      ...CardData
    }
  }
  ${fragment}
`;
export const CARDS_CORE_SUB = gql`
  subscription Simulators($simulatorId: ID!) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      ...CardData
    }
  }
  ${fragment}
`;

const CardsCore = ({simulator, cards}) => {
  const [toggleHidden] = useMutation(gql`
    mutation ToggleSimulatorCardHidden(
      $simulatorId: ID!
      $cardName: String!
      $toggle: Boolean!
    ) {
      toggleSimulatorCardHidden(
        simulatorId: $simulatorId
        cardName: $cardName
        toggle: $toggle
      )
    }
  `);
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
              <input
                type="checkbox"
                checked={c.hidden}
                onChange={e =>
                  toggleHidden({
                    variables: {
                      simulatorId: simulator.id,
                      cardName: c.name,
                      toggle: e.target.checked,
                    },
                  })
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const CardsData = props => {
  return (
    <Query
      query={CARDS_CORE_QUERY}
      variables={{simulatorId: props.simulator.id}}
    >
      {({loading, data, error, subscribeToMore}) => {
        if (loading || !data) return null;
        const {simulators} = data;
        const simulator = simulators.find(s => s.id === props.simulator.id);
        const cards = simulator.stations.reduce(
          (acc, s) => acc.concat(s.cards.map(c => ({...c, station: s.name}))),
          [],
        );
        return (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: CARDS_CORE_SUB,
                variables: {simulatorId: props.simulator.id},
                updateQuery: (previousResult, {subscriptionData}) => {
                  return Object.assign({}, previousResult, {
                    simulators: subscriptionData.data.simulatorsUpdate,
                  });
                },
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
