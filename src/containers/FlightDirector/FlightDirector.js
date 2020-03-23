import React from "react";
import Core from "../../components/core";
import {useParams, useNavigate} from "react-router-dom";

const FlightDirector = () => {
  const {flightId} = useParams();
  const navigate = useNavigate();
  return <Core flightId={flightId} navigate={navigate} />;
};

export default FlightDirector;
