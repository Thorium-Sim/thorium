import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { GenericSystemConfig } from "./Generic";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const Phasers = ({ data, client, simulatorId, type }) => {
  if (data.loading) return null;
  const { phasers, decks } = data;

  const updateBeams = ({ id }, count) => {
    const mutation = gql`
      mutation PhaserBeams($id: ID!, $count: Int!) {
        setPhaserBeamCount(id: $id, beamCount: $count)
      }
    `;
    const variables = { id, count };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Phasers"]
    });
  };
  if (phasers.length === 0) return <p>Click the checkbox to add phasers</p>;
  return (
    <div className="shield scroll">
      {phasers.map(e => (
        <GenericSystemConfig
          key={e.id}
          client={client}
          simulatorId={simulatorId}
          type={type}
          data={{ systems: [e], decks }}
        >
          <FormGroup className="beams">
            <Label style={{ display: "inline-block" }}>
              Beams: {e.beams.length}
              <Input
                type="range"
                min="1"
                max="12"
                value={e.beams.length}
                onMouseUp={evt => {
                  updateBeams(e, evt.target.value);
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
  query Phasers($id: ID, $deckId: ID!) {
    phasers(simulatorId: $id) {
      id
      name
      displayName
      type
      power {
        power
        powerLevels
      }
      beams {
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
})(Phasers);
