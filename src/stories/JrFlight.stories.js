import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/JrFlight/index.js";
import {
  JR_NAVIGATION_QUERY,
  JR_NAVIGATION_SUB,
} from "components/views/JrFlight/navigation.js";
import {JR_THRUSTER_QUERY} from "components/views/JrFlight/thrusters.js";
import {
  JR_SPEEDCHANGE_SUB,
  JR_ENGINE_QUERY,
} from "components/views/JrFlight/engines.js";

export default {
  title: "Cards|Jr/JrFlight",
};
export const JrFlight = () => (
  <StorybookWrapper
    queries={[
      JR_THRUSTER_QUERY,
      JR_NAVIGATION_QUERY,
      JR_NAVIGATION_SUB,
      JR_SPEEDCHANGE_SUB,
      JR_ENGINE_QUERY,
    ]}
  >
    <Component {...baseProps} />
  </StorybookWrapper>
);
