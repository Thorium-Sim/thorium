import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component, {
  NAV_QUERY,
  NAV_THRUSTER_SUB,
  NAV_ENGINE_SUB,
} from "../components/views/NavigationAdvanced/index.js";

export default {
  title: "Cards|Navigation/NavigationAdvanced",
};
export const NavigationAdvanced = () => (
  <StorybookWrapper queries={[NAV_ENGINE_SUB, NAV_QUERY, NAV_THRUSTER_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
