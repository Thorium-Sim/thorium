import React from "react";
import {SubscriptionClient} from "subscriptions-transport-ws";
import create, {UseStore, StoreApi} from "zustand";
import {
  separateOperations,
  print,
  DocumentNode,
  OperationDefinitionNode,
  FieldNode,
} from "graphql";
import {equal} from "@wry/equality";

const hostname = window.location.hostname;
const protocol = window.location.protocol;
const wsProtocol = protocol === "https:" ? "wss:" : "ws:";

const websocketUrl =
  process.env.NODE_ENV === "production"
    ? `${wsProtocol}//${window.location.host}/graphql`
    : `${wsProtocol}//${hostname}:${parseInt(
        window.location.port || "3000",
        10,
      ) + 1}/graphql`;

const client = new SubscriptionClient(websocketUrl, {
  reconnect: true,
});

function usePatchedSubscriptions<SubData, VariableDefinition>(
  queryAST: DocumentNode,
  variablesInput?: VariableDefinition | undefined,
): [
  UseStore<{loading: boolean; data: SubData}>,
  StoreApi<{loading: boolean; data: SubData}>,
] {
  const [useStore, api] = React.useMemo(
    () =>
      create<{loading: boolean; data: SubData}>(() => ({
        loading: true,
        data: ([] as unknown) as SubData,
      })),
    [],
  );

  const [variables, setVariables] = React.useState<
    VariableDefinition | undefined
  >(variablesInput);

  React.useEffect(() => {
    if (!equal(variables, variablesInput)) {
      setVariables(variablesInput);
    }
  }, [variables, variablesInput]);

  React.useEffect(() => {
    const query = print(queryAST);
    const definitions = queryAST.definitions[0] as OperationDefinitionNode;
    const selection = definitions.selectionSet.selections[0] as FieldNode;
    const operationName = Object.keys(separateOperations(queryAST))[0];
    const selectionName = selection.name.value;
    const unsubscribe = client
      .request({
        query,
        operationName,
        variables,
      })
      .subscribe({
        next: ({data}) => {
          api.setState({loading: false, data: data?.[selectionName] || []});
        },
      });
    return () => unsubscribe.unsubscribe();
  }, [api, queryAST, variables]);

  return [useStore, api];
}

export default usePatchedSubscriptions;
