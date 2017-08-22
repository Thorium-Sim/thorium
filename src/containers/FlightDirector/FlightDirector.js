import React from "react";
import Core from "../../components/core";

export default ({ params: { flightId } }) => {
  return <Core flightId={flightId} />;
};
