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
} from "generated/graphql";

const ClientData = props => {
  const [clientId, setClientId] = React.useState(null);

  const [connect] = useRegisterClientMutation();
  const [disconnect] = useDisconnectClientMutation();

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
      // Keep the context menu from opening.
      return () => disconnect({variables: {client: clientId}});
    }
  }, [clientId, connect, disconnect]);

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

  if (!clientId || loading || !data || !clients || !clients[0]) {
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
