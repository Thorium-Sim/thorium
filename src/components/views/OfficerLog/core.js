import React from "react";
import gql from "graphql-tag.macro";
import {useQuery} from "@apollo/client";
import {useSubscribeToMore} from "../../../helpers/hooks/useQueryAndSubscribe";

export const OFFICER_LOG_CORE_QUERY = gql`
  query OfficerLog($clientId: ID, $flightId: ID!) {
    officerLogs(clientId: $clientId, flightId: $flightId) {
      id
      log
      clientId
      timestamp
    }
  }
`;
export const OFFICER_LOG_CORE_SUB = gql`
  subscription OfficerLogUpdate($clientId: ID, $flightId: ID!) {
    officerLogsUpdate(clientId: $clientId, flightId: $flightId) {
      id
      log
      clientId
      timestamp
    }
  }
`;

const OfficerLogCore = props => {
  const {flightId} = props;
  const {loading, data, subscribeToMore} = useQuery(OFFICER_LOG_CORE_QUERY, {
    variables: {flightId},
  });
  const config = React.useMemo(
    () => ({
      variables: {
        flightId,
      },
      updateQuery: (previousResult, {subscriptionData}) => ({
        ...previousResult,
        officerLogs: subscriptionData.data.officerLogsUpdate,
      }),
    }),
    [flightId],
  );
  useSubscribeToMore(subscribeToMore, OFFICER_LOG_CORE_SUB, config);

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
