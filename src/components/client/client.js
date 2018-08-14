import React, { Fragment } from "react";
import SoundController from "./soundController";
import Caching from "./caching";
import CardContainer from "./Card";
import Credits from "./credits";

const Client = ({
  clientId,
  client,
  flight,
  simulator,
  station,
  updateClientId
}) => {
  return (
    <Fragment>
      <SoundController clientId={clientId} />
      <Caching client={client} />
      {flight && simulator && station ? (
        <CardContainer
          flight={flight}
          simulator={simulator}
          station={station}
          client={client}
        />
      ) : (
        <Credits
          flight={flight}
          simulator={simulator}
          station={station}
          client={client}
          clientId={clientId}
          updateClientId={updateClientId}
        />
      )}
    </Fragment>
  );
};
export default Client;
