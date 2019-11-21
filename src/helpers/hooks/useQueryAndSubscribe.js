import React from "react";
import {useQuery, useSubscription} from "@apollo/react-hooks";

export default function useQueryAndSubscription(query, subscription) {
  const {query: queryDocument, ...queryRest} = query;
  const {query: subDocument, ...subRest} = subscription;
  const {loading, data: queryData, error} = useQuery(queryDocument, queryRest);
  const {data: subData} = useSubscription(subDocument, subRest);
  const queryName =
    queryDocument.definitions[0].selectionSet.selections[0].name.value;
  const subName =
    subDocument.definitions[0].selectionSet.selections[0].name.value;

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
