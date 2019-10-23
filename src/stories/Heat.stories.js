import React from "react";

import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";

import CoreComponent, {
  HEAT_QUERY,
  HEAT_SUB,
  COOLANT_SYSTEM_SUB,
  COOLANT_SUB,
} from "../components/views/Heat/core.js";

export default {
  title: "Cards|Operations/Heat",
};

export const Core = () => (
  <StorybookWrapperCore
    queries={[HEAT_QUERY, HEAT_SUB, COOLANT_SYSTEM_SUB, COOLANT_SUB]}
  >
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
