import React from "react";
import {useQuery, useSubscription} from "@apollo/react-hooks";

export default function useQueryAndSubscription(query, subscription) {
  const {loading, data: queryData, error} = useQuery(...query);
  const {data: subData} = useSubscription(...subscription);
  const queryName =
    query[0].definitions[0].selectionSet.selections[0].name.value;
  const subName =
    subscription[0].definitions[0].selectionSet.selections[0].name.value;

  const data = subData ? {[queryName]: subData[subName]} : queryData;

  return {loading, data, error};
}

export function useSubscribeToMore(
  subscribeToMore,
  subscription,
  config,
  noSub = false,
) {
  const s2m = React.useCallback(subscribeToMore, []);

  React.useEffect(() => {
    if (noSub) return () => {};
    const sub = s2m({document: subscription, ...config});
    return () => sub();
  }, [config, noSub, s2m, subscription]);
}
