import React from "react";
import gql from "graphql-tag.macro";

const Settings = props => {
  const logout = () => {
    const client = props.clientObj.id;
    const obj = {
      client,
    };
    const mutation = gql`
      mutation LogoutClient($client: ID!) {
        clientLogout(client: $client)
      }
    `;
    props.client.mutate({
      mutation: mutation,
      variables: obj,
    });
  };
  const startTraining = () => {
    // Card-aware help: jumps to the in-flight (or regular) chapter for the
    // crew's current card, falling back to begin-training. Resolved server-side.
    const clientId = props.clientObj.id;
    const mutation = gql`
      mutation ClientRequestTrainingHelp($clientId: ID!) {
        clientRequestTrainingHelp(clientId: $clientId)
      }
    `;
    props.client.mutate({
      mutation,
      variables: {clientId},
    });
  };
  return (
    <div
      className={`settingsBall help ${
        props.station.login ? "" : props.clientObj.loginState
      } ${props.clientObj.offlineState ? "offline" : ""}`}
    >
      <div className={`icon ${props.className}`} />
      <ul className="options">
        <li onClick={startTraining}>Help</li>
        {/*<li>Lock Screen</li>
        <li>Reset Terminal</li>
        <li>Diagnostic</li>*/}
        {!props.station.login && <li onClick={logout}>Logout</li>}
      </ul>
    </div>
  );
};

export default Settings;
