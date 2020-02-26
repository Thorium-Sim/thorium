import React from "react";
import {SubscriptionClient} from "subscriptions-transport-ws";
import create from "zustand";
import {applyPatches} from "immer";
import {websocketUrl} from "helpers/graphqlClient";
import {
  separateOperations,
  print,
  DocumentNode,
  OperationDefinitionNode,
  FieldNode,
} from "graphql";
const client = new SubscriptionClient(websocketUrl, {
  reconnect: true,
});

function validateQuery(queryAST: FieldNode) {
  const selections = queryAST.selectionSet?.selections.map(s => {
    const selection = s as FieldNode;
    return selection.name.value;
  });
  if (!selections || selections.length === 0) return false;
  if (!selections.includes("op")) return false;
  if (!selections.includes("value")) return false;
  if (!selections.includes("path")) return false;
  if (!selections.includes("values")) return false;
  return true;
}

function usePatchedSubscriptions<T>(queryAST: DocumentNode) {
  const [useStore, api] = React.useMemo(
    () => create<{[key: string]: T}>(() => ({})),
    [],
  );
  React.useEffect(() => {
    const query = print(queryAST);
    const definitions = queryAST.definitions[0] as OperationDefinitionNode;
    const selection = definitions.selectionSet.selections[0] as FieldNode;
    const operationName = Object.keys(separateOperations(queryAST))[0];
    const selectionName = selection.name.value;
    if (!validateQuery(selection))
      throw new Error(
        "Invalid query. Query must be an implementation of the Patch type.",
      );
    const unsubscribe = client
      .request({
        query,
        operationName,
      })
      .subscribe({
        next: ({data}) => {
          if (data?.[selectionName][0].values) {
            // We're getting initial data.
            api.setState({
              [selectionName]: data[selectionName][0].values,
            });
          } else {
            // We're getting a patch, apply the patch with immer.
            const patches = data?.[selectionName];
            api.setState({
              [selectionName]: applyPatches(
                api.getState()[selectionName],
                patches,
              ),
            });
          }
        },
      });
    return () => unsubscribe.unsubscribe();
  }, [api, queryAST]);

  return useStore;
}

export default usePatchedSubscriptions;
