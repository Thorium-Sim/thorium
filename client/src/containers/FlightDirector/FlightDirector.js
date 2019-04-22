import React from "react";
import Core from "../../components/core";

const FlightDirector = ({
  history,
  match: {
    params: { flightId }
  }
}) => {
  return <Core flightId={flightId} history={history} />;
};

export default FlightDirector;
