import React from "react";
import { Button } from "reactstrap";
import { GenericSystemConfig } from "./Generic";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const ops = {
  addSystem: gql`
    mutation AddSystemToSimulator($id: ID!, $params: String!) {
      addSystemToSimulator(
        simulatorId: $id
        className: "Shield"
        params: $params
      )
    }
  `,
  removeSystem: gql`
    mutation RemoveSystem($id: ID) {
      removeSystemFromSimulator(systemId: $id)
    }
  `
};

const Shields = ({ data, client, simulatorId, type }) => {
  if (data.loading) return null;
  const { shields, decks } = data;

  const reconfigureShields = num => {
    const shieldNames = [
      "Fore",
      "Aft",
      "Port",
      "Starboard",
      "Ventral",
      "Dorsal"
    ];
    // Remove all of the shields
    shields.forEach(s => {
      client.mutate({
        mutation: ops.removeSystem,
        variables: { id: s.id },
        refetchQueries: ["Shields"]
      });
    });
    if (num === 0) return;
    // Add in enough shields for our purposes.
    if (num === 1) {
      // Default is sufficient
      client.mutate({
        mutation: ops.addSystem,
        variables: {
          id: simulatorId,
          params: "{}"
        },
        refetchQueries: ["Shields"]
      });
    } else {
      Array(num)
        .fill("")
        .forEach((_, i) => {
          client.mutate({
            mutation: ops.addSystem,
            variables: {
              id: simulatorId,
              params: JSON.stringify({
                name: shieldNames[i],
                position: i + 1
              })
            },
            refetchQueries: ["Shields"]
          });
        });
    }
  };

  return (
    <div className="shield scroll">
      <Button onClick={() => reconfigureShields(0)}>No Shield</Button>
      <Button onClick={() => reconfigureShields(1)}>1 Shield</Button>
      <Button onClick={() => reconfigureShields(4)}>4 Shields</Button>
      <Button onClick={() => reconfigureShields(6)}>6 Shields</Button>
      {shields.map(e => (
        <GenericSystemConfig
          key={e.id}
          client={client}
          simulatorId={simulatorId}
          type={type}
          data={{ systems: [e], decks }}
        />
      ))}
    </div>
  );
};

const SYSTEM_QUERY = gql`
  query Shields($id: ID, $deckId: ID!) {
    decks(simulatorId: $deckId) {
      id
      number
      rooms {
        id
        name
      }
    }
    shields(simulatorId: $id) {
      id
      name
      displayName
      type
      power {
        power
        powerLevels
      }
    }
  }
`;

export default graphql(SYSTEM_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      id: ownProps.simulatorId,
      deckId: ownProps.simulatorId
    }
  })
})(Shields);
