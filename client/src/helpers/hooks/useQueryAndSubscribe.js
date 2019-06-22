import React from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";

export default function useQueryAndSubscription(query, subscription) {
  const { loading, data, error } = useQuery(...query);
  useSubscription(...subscription);
  return { loading, data, error };
}

export function useSubscribeToMore(subscribeToMore, subscription, config) {
  const s2m = React.useCallback(subscribeToMore, []);

  React.useEffect(() => {
    const sub = s2m({ document: subscription, ...config });
    return () => sub();
  }, [config, s2m, subscription]);
}
