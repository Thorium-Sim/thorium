import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag.macro";
import { Query, Mutation } from "react-apollo";

const SICKBAY_QUERY = gql`
  query Sickbay($id: ID!) {
    sickbaySingle(id: $id) {
      id
      autoFinishDecon
      bunks {
        id
      }
    }
  }
`;
const Sickbay = props => {
  const { id } = props;
  return (
    <GenericSystemConfig {...props}>
      <Query query={SICKBAY_QUERY} variables={{ id }}>
        {({ loading, data }) => {
          if (loading) return null;
          const { sickbaySingle: sickbay } = data;
          return (
            <div>
              <p>Set the bunk count to the same number of bunks in your set.</p>
              <FormGroup className="beams">
                <Label style={{ display: "inline-block" }}>
                  Bunks: {sickbay.bunks.length}
                  <Mutation
                    mutation={gql`
                      mutation SickbayBunks($id: ID!, $count: Int!) {
                        setSickbayBunks(id: $id, count: $count)
                      }
                    `}
                    refetchQueries={[
                      { query: SICKBAY_QUERY, variables: { id } }
                    ]}
                  >
                    {action => (
                      <Input
                        type="range"
                        min="0"
                        max="12"
                        defaultValue={sickbay.bunks.length}
                        onMouseUp={evt => {
                          action({
                            variables: { id, count: evt.target.value }
                          });
                        }}
                      />
                    )}
                  </Mutation>
                </Label>
              </FormGroup>
              <label>
                <Mutation
                  mutation={gql`
                    mutation AutoDecon($id: ID!, $finish: Boolean!) {
                      setDeconAutoFinish(id: $id, finish: $finish)
                    }
                  `}
                  refetchQueries={[{ query: SICKBAY_QUERY, variables: { id } }]}
                >
                  {action => (
                    <input
                      type="checkbox"
                      checked={sickbay.autoFinishDecon}
                      onChange={e =>
                        action({ variables: { id, finish: e.target.checked } })
                      }
                    />
                  )}
                </Mutation>{" "}
                Auto-finish Decon Program
              </label>
            </div>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};

export default Sickbay;
