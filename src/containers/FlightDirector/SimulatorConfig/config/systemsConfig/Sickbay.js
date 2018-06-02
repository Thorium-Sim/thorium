import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { GenericSystemConfig } from "./Generic";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const Sickbay = ({ data, client, simulatorId, type }) => {
  if (data.loading) return null;
  const { sickbay, decks } = data;

  const updateBunks = ({ id }, count) => {
    const mutation = gql`
      mutation SickbayBunks($id: ID!, $count: Int!) {
        setSickbayBunks(id: $id, count: $count)
      }
    `;
    const variables = { id, count };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Sickbay"]
    });
  };
  if (sickbay.length === 0)
    return <p>Click the checkbox to add bunks to match the set's sickbay</p>;
  return (
    <div className="shield scroll">
      {sickbay.map(e => (
        <GenericSystemConfig
          key={e.id}
          client={client}
          simulatorId={simulatorId}
          type={type}
          data={{ systems: [e], decks }}
        >
          <FormGroup className="beams">
            <Label style={{ display: "inline-block" }}>
              Bunks: {e.bunks.length}
              <Input
                type="range"
                min="0"
                max="12"
                defaultValue={e.bunks.length}
                onMouseUp={evt => {
                  updateBunks(e, evt.target.value);
                }}
              />
            </Label>
          </FormGroup>
        </GenericSystemConfig>
      ))}
    </div>
  );
};

const SYSTEM_QUERY = gql`
  query Sickbay($id: ID, $deckId: ID!) {
    sickbay(simulatorId: $id) {
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
      bunks {
        id
      }
    }
    decks(simulatorId: $deckId) {
      id
      number
      rooms {
        id
        name
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
})(Sickbay);
