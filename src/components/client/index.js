import React from "react";
import {getClientId, setClientId as setId} from "helpers/getClientId";
import SimulatorData from "./simulatorData";
import Credits from "./credits";
import "./client.scss";
import {
  useDisconnectClientMutation,
  useRegisterClientMutation,
  useClientQuery,
  useClientUpdateSubscription,
  useClientPingMutation,
} from "generated/graphql";
import gql from "graphql-tag.macro";
import {useApolloClient} from "@apollo/client";

const ClientPingSub = gql`
  subscription ClientPingSub($clientId: ID!) {
    clientPing(clientId: $clientId)
  }
`;
const ClientData = props => {
  const [clientId, setClientId] = React.useState(null);

  const [connect] = useRegisterClientMutation();
  const [disconnect] = useDisconnectClientMutation();
  const [ping] = useClientPingMutation();

  const client = useApolloClient();

  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      };
    }

    getClientId().then(res => setClientId(res));
  }, []);

  React.useEffect(() => {
    // Register the client for the first time.
    if (clientId) {
      connect({variables: {client: clientId}});

      const observer = client
        .subscribe({query: ClientPingSub, variables: {clientId}})
        .subscribe({
          next() {
            ping({variables: {clientId}});
          },
        });
      // Keep the context menu from opening.
      return () => {
        disconnect({variables: {client: clientId}});
        observer.unsubscribe();
      };
    }
  }, [client, clientId, connect, disconnect, ping]);

  const updateClientId = async clientId => {
    const oldClientId = await getClientId();
    setClientId(clientId);
    setId(clientId);
    await disconnect({variables: {client: oldClientId}});
    await connect({variables: {client: clientId}});
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const {loading, data} = useClientQuery({
    variables: {clientId},
    skip: !clientId,
  });
  const {data: subData} = useClientUpdateSubscription({variables: {clientId}});

  const clients = subData?.clientChanged || data?.clients;

  if (
    !clientId ||
    loading ||
    !data ||
    !clients ||
    !clients[0] ||
    !clients[0].flight ||
    !clients[0].simulator ||
    !clients[0].station
  ) {
    return (
      <Credits
        {...props}
        clientId={clientId}
        {...clients?.[0]}
        client={clients?.[0]}
        updateClientId={updateClientId}
      />
    );
  }

  return (
    <SimulatorData
      {...props}
      {...clients[0]}
      clientId={clientId}
      updateClientId={updateClientId}
      client={clients[0]}
    />
  );
};
export default ClientData;
