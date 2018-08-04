import React from "react";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
const SENSORS_QUERY = gql`
  query Sensors($id: ID!) {
    sensor(id: $id) {
      id
      history
    }
  }
`;
const Sensors = props => {
  const { id } = props;
  return (
    <GenericSystemConfig {...props}>
      <Query query={SENSORS_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return null;
          const { history } = data.sensor;
          return (
            <label>
              <Mutation
                mutation={gql`
                  mutation SensorsHistory($id: ID!, $history: Boolean!) {
                    setSensorsHistory(id: $id, history: $history)
                  }
                `}
                refetchQueries={[{ query: SENSORS_QUERY, variables: { id } }]}
              >
                {action => (
                  <input
                    type="checkbox"
                    checked={history}
                    onChange={() =>
                      action({ variables: { id, history: !history } })
                    }
                  />
                )}
              </Mutation>
              Scanning History
            </label>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};
export default Sensors;
