import React from "react";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Input, FormGroup, Label } from "reactstrap";

const REACTOR_QUERY = gql`
  query Reactor($id: ID!) {
    reactor(id: $id) {
      model
      powerOutput
    }
  }
`;

const Reactor = props => {
  const { id } = props;
  return (
    <GenericSystemConfig {...props}>
      <Query query={REACTOR_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return null;
          const { reactor } = data;
          return (
            <div>
              <FormGroup>
                <Label>Model</Label>
                <Mutation
                  mutation={gql`
                    mutation ReactorModel($id: ID!, $model: String!) {
                      reactorChangeModel(id: $id, model: $model)
                    }
                  `}
                  refetchQueries={[{ query: REACTOR_QUERY, variables: { id } }]}
                >
                  {action => (
                    <Input
                      type="select"
                      value={reactor.model}
                      onChange={e =>
                        action({ variables: { id, model: e.target.value } })
                      }
                    >
                      <option value="reactor">Reactor</option>
                      <option value="battery">Battery</option>
                    </Input>
                  )}
                </Mutation>
              </FormGroup>
              {reactor.model === "reactor" && (
                <FormGroup>
                  <Label>
                    Reactor Output
                    <Mutation
                      mutation={gql`
                        mutation UpdateReactorOutput($id: ID!, $output: Int!) {
                          reactorChangeOutput(id: $id, output: $output)
                        }
                      `}
                      refetchQueries={[
                        { query: REACTOR_QUERY, variables: { id } }
                      ]}
                    >
                      {action => (
                        <Input
                          type="number"
                          value={reactor.powerOutput}
                          onChange={evt =>
                            action({
                              variables: { id, output: evt.target.value }
                            })
                          }
                        />
                      )}
                    </Mutation>
                  </Label>
                </FormGroup>
              )}
            </div>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};
export default Reactor;
