import React from "react";
import Core from "../../components/core";

export default ({
  history,
  match: {
    params: { flightId }
  }
}) => {
  return <Core flightId={flightId} history={history} />;
};
