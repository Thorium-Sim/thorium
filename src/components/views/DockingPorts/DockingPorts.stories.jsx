import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  DOCKING_PORT_QUERY,
  DOCKING_PORT_SUB,
} from "components/views/DockingPorts/index.js";
import CoreComponent, {
  DOCKING_PORT_CORE_QUERY,
  DOCKING_PORT_CORE_SUB,
} from "components/views/DockingPorts/core.js";

export default {
  title: "Cards|Operations/DockingPorts",
};
export const DockingPorts = () => (
  <StorybookWrapper queries={[DOCKING_PORT_QUERY, DOCKING_PORT_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore
    queries={[DOCKING_PORT_CORE_QUERY, DOCKING_PORT_CORE_SUB]}
  >
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
