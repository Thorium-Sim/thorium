import React from "react";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const STEALTH_QUERY = gql`
  query Stealth($id: ID!) {
    stealth(id: $id) {
      id
      charge
      activated
      changeAlert
    }
  }
`;
const StealthField = props => {
  const { id } = props;
  return (
    <GenericSystemConfig {...props}>
      <Query query={STEALTH_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return null;
          const { stealth } = data;
          return (
            <div>
              <label>
                <Mutation
                  mutation={gql`
                    mutation ToggleCharge($id: ID!, $state: Boolean!) {
                      setStealthCharge(id: $id, state: $state)
                    }
                  `}
                  refetchQueries={[{ query: STEALTH_QUERY, variables: { id } }]}
                >
                  {action => (
                    <input
                      type="checkbox"
                      checked={stealth.charge}
                      onChange={() =>
                        action({
                          variables: { id, state: !stealth.charge }
                        })
                      }
                    />
                  )}
                </Mutation>
                Require charge to activate
              </label>
              <label>
                <Mutation
                  mutation={gql`
                    mutation ToggleActivated($id: ID!, $state: Boolean!) {
                      setStealthActivated(id: $id, state: $state)
                    }
                  `}
                  refetchQueries={[{ query: STEALTH_QUERY, variables: { id } }]}
                >
                  {action => (
                    <input
                      type="checkbox"
                      checked={!stealth.activated}
                      onChange={() =>
                        action({
                          variables: { id, state: !stealth.activated }
                        })
                      }
                    />
                  )}
                </Mutation>
                Always activated
              </label>
              <label>
                <Mutation
                  mutation={gql`
                    mutation ToggleChangeAlert($id: ID!, $change: Boolean!) {
                      stealthChangeAlert(id: $id, change: $change)
                    }
                  `}
                  refetchQueries={[{ query: STEALTH_QUERY, variables: { id } }]}
                >
                  {action => (
                    <input
                      type="checkbox"
                      checked={stealth.changeAlert}
                      onChange={() =>
                        action({
                          variables: { id, change: !stealth.changeAlert }
                        })
                      }
                    />
                  )}
                </Mutation>
                Change simulator alert color when stealthed
              </label>
            </div>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};
export default StealthField;
