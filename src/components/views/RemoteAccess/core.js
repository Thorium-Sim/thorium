import React from "react";
import gql from "graphql-tag.macro";
import {Container, Button} from "helpers/reactstrap";
import {useQuery, useApolloClient} from "@apollo/client";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";

export const REMOTE_ACCESS_QUERY = gql`
  query Simulator($simulatorId: ID) {
    simulators(id: $simulatorId) {
      id
      ship {
        remoteAccessCodes {
          id
          code
          state
          station
          timestamp
        }
      }
    }
  }
`;

export const REMOTE_ACCESS_SUB = gql`
  subscription SimulatorSub($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        remoteAccessCodes {
          id
          code
          state
          station
          timestamp
        }
      }
    }
  }
`;

const mutation = gql`
  mutation RemoteRespond($simulatorId: ID!, $codeId: ID!, $state: String!) {
    remoteAccessUpdateCode(
      simulatorId: $simulatorId
      codeId: $codeId
      state: $state
    )
  }
`;

const RemoteAccessCore = ({simulator}) => {
  const client = useApolloClient();
  const {loading, data, subscribeToMore} = useQuery(REMOTE_ACCESS_QUERY, {
    variables: {simulatorId: simulator.id},
  });
  const config = React.useMemo(
    () => ({
      variables: {simulatorId: simulator.id},
      updateQuery: (previousResult, {subscriptionData}) => ({
        ...previousResult,
        simulators: subscriptionData.data.simulatorsUpdate,
      }),
    }),
    [simulator.id],
  );
  useSubscribeToMore(subscribeToMore, REMOTE_ACCESS_SUB, config);
  if (loading || !data) return null;
  const {simulators} = data;
  const {ship} = simulators[0];

  const respond = (codeId, state) => {
    const variables = {
      simulatorId: simulator.id,
      codeId,
      state,
    };
    client.mutate({
      mutation,
      variables,
    });
  };

  return (
    <Container className="remote-access-core">
      <div
        style={{
          overflowY: "auto",
          height: "calc(100% - 16px)",
          maxHeight: "300px",
        }}
      >
        {ship.remoteAccessCodes
          .slice()
          .reverse()
          .map(c => (
            <div
              key={c.id}
              style={{display: "flex", justifyContent: "space-between"}}
            >
              <p
                style={{
                  backgroundColor: "lightgray",
                  margin: "1px",
                  flex: "6 0 0",
                }}
                title={`${c.station} - ${c.timestamp}`}
              >
                {c.code}
              </p>
              {c.state === "sent" ? (
                <div>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => respond(c.id, "Denied")}
                  >
                    Deny
                  </Button>
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => respond(c.id, "Accepted")}
                  >
                    Accept
                  </Button>
                </div>
              ) : (
                <p
                  style={{flex: "1 0 0"}}
                  className={
                    c.state === "Accepted" ? "text-success" : "text-danger"
                  }
                >
                  {c.state}
                </p>
              )}
            </div>
          ))}
      </div>
    </Container>
  );
};

export default RemoteAccessCore;
