import React, {Fragment} from "react";
import GenericSystemConfig from "./Generic";
import gql from "graphql-tag.macro";
import {Query, Mutation} from "react-apollo";
import {useSensorsSetPingsMutation} from "generated/graphql";
const SENSORS_QUERY = gql`
  query Sensors($id: ID!) {
    sensor(id: $id) {
      id
      history
      autoTarget
      pings
    }
  }
`;
const Sensors = props => {
  const {id} = props;
  const [setPing] = useSensorsSetPingsMutation({
    refetchQueries: [{query: SENSORS_QUERY, variables: {id}}],
  });
  return (
    <GenericSystemConfig {...props}>
      <Query query={SENSORS_QUERY} variables={{id}}>
        {({data, loading}) => {
          if (loading) return null;
          const {history, autoTarget, pings} = data.sensor;
          return (
            <Fragment>
              <label>
                <Mutation
                  mutation={gql`
                    mutation SensorsHistory($id: ID!, $history: Boolean!) {
                      setSensorsHistory(id: $id, history: $history)
                    }
                  `}
                  refetchQueries={[{query: SENSORS_QUERY, variables: {id}}]}
                >
                  {action => (
                    <input
                      type="checkbox"
                      checked={history}
                      onChange={() =>
                        action({variables: {id, history: !history}})
                      }
                    />
                  )}
                </Mutation>
                Scanning History
              </label>
              <label>
                Auto-add to targeting{" "}
                <Mutation
                  mutation={gql`
                    mutation SensorsAutoTarget($id: ID!, $target: Boolean!) {
                      toggleSensorsAutoTarget(id: $id, target: $target)
                    }
                  `}
                  refetchQueries={[{query: SENSORS_QUERY, variables: {id}}]}
                >
                  {action => (
                    <input
                      type="checkbox"
                      checked={autoTarget}
                      onClick={e =>
                        action({variables: {id, target: e.target.checked}})
                      }
                    />
                  )}
                </Mutation>
              </label>
              <label>
                Use Sonar Ping{" "}
                <input
                  type="checkbox"
                  checked={pings}
                  onClick={e => {
                    setPing({
                      variables: {id, ping: e.target.checked},
                    });
                  }}
                />
              </label>
            </Fragment>
          );
        }}
      </Query>
    </GenericSystemConfig>
  );
};

export default Sensors;
