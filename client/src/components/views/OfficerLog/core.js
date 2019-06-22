import React from "react";
import gql from "graphql-tag.macro";
import { useQuery } from "@apollo/react-hooks";
import { useSubscribeToMore } from "../../../helpers/hooks/useQueryAndSubscribe";

const QUERY = gql`
  query OfficerLog($clientId: ID, $flightId: ID!) {
    officerLogs(clientId: $clientId, flightId: $flightId) {
      id
      log
      clientId
      timestamp
    }
  }
`;
const SUB = gql`
  subscription OfficerLogUpdate($clientId: ID, $flightId: ID!) {
    officerLogsUpdate(clientId: $clientId, flightId: $flightId) {
      id
      log
      clientId
      timestamp
    }
  }
`;

const OfficerLogCore = ({ flightId }) => {
  const { loading, data, subscribeToMore } = useQuery(QUERY, {
    variables: { flightId }
  });
  const config = React.useMemo(
    () => ({
      variables: {
        flightId
      },
      updateQuery: (previousResult, { subscriptionData }) => ({
        ...previousResult,
        officerLogs: subscriptionData.data.officerLogsUpdate
      })
    }),
    [flightId]
  );
  useSubscribeToMore(subscribeToMore, SUB, config);

  if (loading || !data.officerLogs) return null;

  return (
    <div className="officers-log-core">
      {data.officerLogs
        .concat()
        .sort((a, b) => {
          if (new Date(a.timestamp) < new Date(b.timestamp)) return 1;
          if (new Date(a.timestamp) > new Date(b.timestamp)) return -1;
          return 0;
        })
        .map(l => (
          <div>
            <p>
              <strong>
                {l.clientId} - {new Date(l.timestamp).toLocaleTimeString()}
              </strong>
            </p>
            <pre>{l.log}</pre>
          </div>
        ))}
    </div>
  );
};
export default OfficerLogCore;
