import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component, {FLIGHT_QUERY} from "../components/views/Login/index.js";

export default {
  title: "Cards|Crew/Login",
};
export const Login = () => (
  <StorybookWrapper queries={[[FLIGHT_QUERY, [], {flightId: "test"}]]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
