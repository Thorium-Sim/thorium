import React from "react";
import { GenericSystemConfig } from "./Generic";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const Sensors = ({ data, client, simulatorId, type }) => {
  if (data.loading) return null;
  const { sensors, decks } = data;
  const toggleHistory = ({ id, history }) => {
    const mutation = gql`
      mutation SensorsHistory($id: ID!, $history: Boolean!) {
        setSensorsHistory(id: $id, history: $history)
      }
    `;
    const variables = {
      id: id,
      history: !history
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Sensors"]
    });
  };
  return (
    <GenericSystemConfig
      client={client}
      simulatorId={simulatorId}
      type={type}
      data={{ systems: sensors, decks }}
      render={sys => (
        <label>
          <input
            type="checkbox"
            checked={sys.history}
            onChange={() => toggleHistory(sys)}
          />
          Scanning History
        </label>
      )}
    />
  );
};

const SENSORS_QUERY = gql`
  query Sensors($id: ID, $deckId: ID!) {
    decks(simulatorId: $deckId) {
      id
      number
      rooms {
        id
        name
      }
    }
    sensors(simulatorId: $id) {
      id
      name
      displayName
      type
      power {
        power
        powerLevels
        defaultLevel
      }
      locations {
        id
        name
        deck {
          number
        }
      }
      history
    }
  }
`;
export default graphql(SENSORS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      id: ownProps.simulatorId,
      deckId: ownProps.simulatorId
    }
  })
})(Sensors);
