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
const ClientData = () => {
  const [clientId, setClientId] = React.useState<string | null>(null);

  const [connect] = useRegisterClientMutation();
  const [disconnect] = useDisconnectClientMutation();
  const [ping] = useClientPingMutation();

  const client = useApolloClient();

  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      window.oncontextmenu = function (event: MouseEvent) {
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

  const updateClientId = async (clientId: string) => {
    const oldClientId = await getClientId();
    setClientId(clientId);
    setId(clientId);
    await disconnect({variables: {client: oldClientId}});
    await connect({variables: {client: clientId}});
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const {data} = useClientQuery({
    variables: {clientId: clientId || ""},
    skip: !clientId,
  });
  const {data: subData} = useClientUpdateSubscription({
    variables: {clientId: clientId || ""},
    skip: !clientId,
  });

  const clients = subData?.clientChanged || data?.clients;

  if (
    !clientId ||
    !clients?.[0]?.flight ||
    !clients?.[0].simulator ||
    !clients?.[0].station
  ) {
    return (
      <Credits
        clientId={clientId || ""}
        flightName={clients?.[0]?.flight?.name || undefined}
        simulatorName={clients?.[0]?.simulator?.name || undefined}
        stationName={clients?.[0]?.station?.name}
        updateClientId={updateClientId}
      />
    );
  }

  return (
    <SimulatorData
      simulator={clients[0].simulator}
      station={clients[0].station}
      flight={clients[0].flight}
      client={clients[0]}
    />
  );
};
export default ClientData;
