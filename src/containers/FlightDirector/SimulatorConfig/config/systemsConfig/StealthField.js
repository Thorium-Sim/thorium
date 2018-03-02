import React from "react";
import { GenericSystemConfig } from "./Generic";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const Sensors = ({ data, client, simulatorId, type }) => {
  if (data.loading) return null;
  const { stealthField, decks } = data;
  const toggleCharge = ({ id, charge }) => {
    const mutation = gql`
      mutation ToggleCharge($id: ID!, $state: Boolean!) {
        setStealthCharge(id: $id, state: $state)
      }
    `;
    const variables = {
      id: id,
      state: !charge
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["StealthField"]
    });
  };
  const toggleActivated = ({ id, activated }) => {
    const mutation = gql`
      mutation ToggleActivated($id: ID!, $state: Boolean!) {
        setStealthActivated(id: $id, state: $state)
      }
    `;
    const variables = {
      id: id,
      state: !activated
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["StealthField"]
    });
  };
  return (
    <GenericSystemConfig
      client={client}
      simulatorId={simulatorId}
      type={type}
      data={{ systems: stealthField, decks }}
      render={sys => (
        <div>
          <label>
            <input
              type="checkbox"
              checked={sys.charge}
              onChange={() => toggleCharge(sys)}
            />
            Require charge to activate
          </label>
          <label>
            <input
              type="checkbox"
              checked={!sys.activated}
              onChange={() => toggleActivated(sys)}
            />
            Always activated
          </label>
        </div>
      )}
    />
  );
};

const SENSORS_QUERY = gql`
  query StealthField($id: ID, $deckId: ID!) {
    decks(simulatorId: $deckId) {
      id
      number
      rooms {
        id
        name
      }
    }
    stealthField(simulatorId: $id) {
      id
      name
      displayName
      type
      power {
        power
        powerLevels
      }
      locations {
        id
        name
        deck {
          number
        }
      }
      charge
      activated
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
