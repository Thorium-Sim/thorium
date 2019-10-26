import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  PROBES_SUB,
  PROBES_QUERY,
} from "../components/views/ProbeControl/index.js";
import CoreComponent, {
  PROBES_CORE_QUERY,
  PROBES_CORE_SUB,
} from "../components/views/ProbeControl/core.js";

export default {
  title: "Cards|Sensors/ProbeControl",
};
export const ProbeControl = () => (
  <StorybookWrapper queries={[PROBES_SUB, PROBES_QUERY]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[PROBES_CORE_QUERY, PROBES_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
