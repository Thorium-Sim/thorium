import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component, {FLIGHT_QUERY} from "components/views/Login/index.js";

export default {
  title: "Cards|Crew/Login",
};
export const Login = () => (
  <StorybookWrapper queries={[[FLIGHT_QUERY, [], {flightId: "test"}]]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
