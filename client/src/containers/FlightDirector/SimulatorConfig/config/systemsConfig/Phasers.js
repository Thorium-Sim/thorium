import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

const PHASER_QUERY = gql`
  query Phaser($id: ID!) {
    phaser(id: $id) {
      id
      beams {
        id
      }
    }
  }
`;
const Phasers = props => {
  const { id } = props;
  return (
    <GenericSystemConfig {...props}>
      <Query query={PHASER_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return null;
          const { phaser } = data;
          return (
            <FormGroup className="beams">
              <Label style={{ display: "inline-block" }}>
                Beams: {phaser.beams.length}
                <Mutation
                  mutation={gql`
                    mutation PhaserBeams($id: ID!, $count: Int!) {
                      setPhaserBeamCount(id: $id, beamCount: $count)
                    }
                  `}
                  refetchQueries={[{ query: PHASER_QUERY, variables: { id } }]}
                >
                  {action => (
                    <Input
                      type="range"
                      min="1"
                      max="12"
                      defaultValue={phaser.beams.length}
                      onMouseUp={evt => {
                        action({ variables: { id, count: evt.target.value } });
                      }}
                    />
                  )}
                </Mutation>
              </Label>
            </FormGroup>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};
export default Phasers;
