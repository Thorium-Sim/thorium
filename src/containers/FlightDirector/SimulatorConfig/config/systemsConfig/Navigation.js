import React from "react";
import { GenericSystemConfig } from "./Generic";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const Navigation = ({ data, client, simulatorId, type }) => {
  if (data.loading) return null;
  const { navigation, decks } = data;
  const [nav] = navigation;
  const toggleThrusters = () => {
    const mutation = gql`
      mutation ToggleNavThrusters($id: ID!, $thrusters: Boolean) {
        navSetThrusters(id: $id, thrusters: $thrusters)
      }
    `;
    const variables = {
      id: nav.id,
      thrusters: !nav.thrusters
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Navigation"]
    });
  };
  const toggleCalculate = e => {
    const mutation = gql`
      mutation ToggleCalculate($id: ID!, $which: Boolean!) {
        navToggleCalculate(id: $id, which: $which)
      }
    `;
    const variables = {
      id: nav.id,
      which: e.target.checked
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Navigation"]
    });
  };
  return (
    <GenericSystemConfig
      client={client}
      simulatorId={simulatorId}
      type={type}
      data={{ systems: [nav], decks }}
    >
      {" "}
      <label>
        <input
          type="checkbox"
          checked={nav.calculate}
          onChange={toggleCalculate}
        />
        Calculate Course
      </label>
      <label>
        <input
          type="checkbox"
          checked={nav.thrusters}
          onChange={toggleThrusters}
        />
        Thruster Navigation
      </label>
    </GenericSystemConfig>
  );
};

const NAV_QUERY = gql`
  query Navigation($id: ID, $deckId: ID!) {
    decks(simulatorId: $deckId) {
      id
      number
      rooms {
        id
        name
      }
    }
    navigation(simulatorId: $id) {
      id
      name
      displayName
      type
      power {
        power
        powerLevels
      }
      calculate
      thrusters
    }
  }
`;
export default graphql(NAV_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      id: ownProps.simulatorId,
      deckId: ownProps.simulatorId
    }
  })
})(Navigation);
