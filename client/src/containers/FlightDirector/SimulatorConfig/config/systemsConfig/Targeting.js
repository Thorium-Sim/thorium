import React from "react";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const TARGETING_QUERY = gql`
  query Targeting($id: ID!) {
    targeting(id: $id) {
      id
      range
    }
  }
`;

const Targeting = props => {
  const { id } = props;
  return (
    <GenericSystemConfig {...props}>
      <Query query={TARGETING_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return null;
          const {
            targeting: [targeting]
          } = data;
          return (
            <div>
              Range: {Math.round(targeting.range * 100)}%{" "}
              <Mutation
                mutation={gql`
                  mutation SetRange($id: ID!, $range: Float!) {
                    setTargetingRange(id: $id, range: $range)
                  }
                `}
                refetchQueries={[{ query: TARGETING_QUERY, variables: { id } }]}
              >
                {action => (
                  <input
                    type="range"
                    defaultValue={targeting.range}
                    onChange={e =>
                      action({
                        variables: {
                          id: targeting.id,
                          range: parseFloat(e.target.value)
                        }
                      })
                    }
                    min="0"
                    max="1"
                    step="0.01"
                  />
                )}
              </Mutation>
              <div>
                <small>
                  Range is a percentage of the radius of the sensor grid. 33% is
                  the first ring, 66% is the second, etc.
                </small>
              </div>
            </div>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};
export default Targeting;
