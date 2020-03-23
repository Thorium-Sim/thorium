import React from "react";
import Core from "../../components/core";
import {useParams, useHistory} from "react-router-dom";

const FlightDirector = () => {
  const {flightId} = useParams();
  const {history} = useHistory();
  return <Core flightId={flightId} history={history} />;
};

export default FlightDirector;
