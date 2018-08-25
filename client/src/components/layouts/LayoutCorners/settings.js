import React from "react";
import gql from "graphql-tag";

const Settings = props => {
  const logout = () => {
    const client = props.clientObj.id;
    const obj = {
      client
    };
    const mutation = gql`
      mutation LogoutClient($client: ID!) {
        clientLogout(client: $client)
      }
    `;
    props.client.mutate({
      mutation: mutation,
      variables: obj
    });
  };
  const startTraining = () => {
    const client = props.clientObj.id;
    const variables = {
      client,
      training: true
    };
    const mutation = gql`
      mutation ClientSetTraining($client: ID!, $training: Boolean!) {
        clientSetTraining(client: $client, training: $training)
      }
    `;
    props.client.mutate({
      mutation,
      variables
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
