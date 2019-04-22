import React, { Fragment } from "react";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag.macro";
import { Query, Mutation } from "react-apollo";

const NAV_QUERY = gql`
  query Navigation($id: ID!) {
    navigate(id: $id) {
      id
      calculate
      thrusters
    }
  }
`;
const Navigation = props => {
  const { id } = props;
  return (
    <GenericSystemConfig {...props}>
      <Query query={NAV_QUERY} variables={{ id }}>
        {({ loading, data }) => {
          if (loading) return null;
          const { navigate } = data;
          const { calculate, thrusters } = navigate;
          return (
            <Fragment>
              <label>
                <Mutation
                  mutation={gql`
                    mutation ToggleCalculate($id: ID!, $which: Boolean!) {
                      navToggleCalculate(id: $id, which: $which)
                    }
                  `}
                  refetchQueries={[{ query: NAV_QUERY, variables: { id } }]}
                >
                  {action => (
                    <input
                      type="checkbox"
                      checked={calculate}
                      onChange={() =>
                        action({
                          variables: { id, which: !calculate }
                        })
                      }
                    />
                  )}
                </Mutation>
                Calculate Course
              </label>
              <label>
                <Mutation
                  mutation={gql`
                    mutation ToggleNavThrusters($id: ID!, $thrusters: Boolean) {
                      navSetThrusters(id: $id, thrusters: $thrusters)
                    }
                  `}
                  refetchQueries={[{ query: NAV_QUERY, variables: { id } }]}
                >
                  {action => (
                    <input
                      type="checkbox"
                      checked={thrusters}
                      onChange={() =>
                        action({
                          variables: { id, thrusters: !thrusters }
                        })
                      }
                    />
                  )}
                </Mutation>
                Thruster Navigation
              </label>
            </Fragment>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};

export default Navigation;
