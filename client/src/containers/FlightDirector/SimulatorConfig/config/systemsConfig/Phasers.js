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
      holdToCharge
      chargeSpeed
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
              <div>
                <Label style={{ display: "inline-block" }}>
                  Beams: {phaser.beams.length}
                  <Mutation
                    mutation={gql`
                      mutation PhaserBeams($id: ID!, $count: Int!) {
                        setPhaserBeamCount(id: $id, beamCount: $count)
                      }
                    `}
                    refetchQueries={[
                      { query: PHASER_QUERY, variables: { id } }
                    ]}
                  >
                    {action => (
                      <Input
                        type="range"
                        min="1"
                        max="12"
                        defaultValue={phaser.beams.length}
                        onMouseUp={evt => {
                          action({
                            variables: { id, count: evt.target.value }
                          });
                        }}
                      />
                    )}
                  </Mutation>
                </Label>
              </div>
              <div>
                <Label style={{ display: "inline-block" }}>
                  Hold To Charge:
                  <Mutation
                    mutation={gql`
                      mutation HoldToCharge($id: ID!, $holdToCharge: Boolean!) {
                        setPhaserHoldToCharge(
                          id: $id
                          holdToCharge: $holdToCharge
                        )
                      }
                    `}
                    refetchQueries={[
                      { query: PHASER_QUERY, variables: { id } }
                    ]}
                  >
                    {action => (
                      <Input
                        type="checkbox"
                        style={{ padding: 0, margin: 0 }}
                        defaultChecked={phaser.holdToCharge}
                        onChange={evt => {
                          action({
                            variables: { id, holdToCharge: evt.target.checked }
                          });
                        }}
                      />
                    )}
                  </Mutation>
                </Label>
              </div>
              <div>
                <Label style={{ display: "inline-block" }}>
                  <span>
                    Charge Speed (only for hold to charge, lower is slower):{" "}
                    {phaser.chargeSpeed}
                    <Mutation
                      mutation={gql`
                        mutation PhaserChargeSpeed($id: ID!, $speed: Float!) {
                          setPhaserChargeSpeed(id: $id, speed: $speed)
                        }
                      `}
                      refetchQueries={[
                        { query: PHASER_QUERY, variables: { id } }
                      ]}
                    >
                      {action => (
                        <Input
                          type="range"
                          min="0.05"
                          max="3"
                          step="0.01"
                          defaultValue={phaser.chargeSpeed}
                          onMouseUp={evt => {
                            action({
                              variables: { id, speed: evt.target.value }
                            });
                          }}
                        />
                      )}
                    </Mutation>
                  </span>
                </Label>
              </div>
            </FormGroup>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};
export default Phasers;
