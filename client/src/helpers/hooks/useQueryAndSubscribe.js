import React from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";

export default function useQueryAndSubscription(query, subscription) {
  const { loading, data, error } = useQuery(...query);
  useSubscription(...subscription);
  return { loading, data, error };
}

export function useSubscribeToMore(subscribeToMore, subscription, config) {
  React.useEffect(() => {
    const sub = subscribeToMore({ document: subscription, ...config });
    return () => sub();
  }, [config, subscribeToMore, subscription]);
}
