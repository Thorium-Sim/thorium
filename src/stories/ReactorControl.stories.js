import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  REACTOR_SUB,
  REACTOR_QUERY,
  SYSTEMS_SUB,
  DOCKING_SUB,
} from "../components/views/ReactorControl/index.js";
import CoreComponent, {
  REACTOR_CORE_QUERY,
  REACTOR_CORE_SUB,
} from "../components/views/ReactorControl/core.js";

export default {
  title: "Cards|Operations/ReactorControl",
};
export const ReactorControl = () => (
  <StorybookWrapper
    queries={[REACTOR_SUB, REACTOR_QUERY, SYSTEMS_SUB, DOCKING_SUB]}
  >
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[REACTOR_CORE_QUERY, REACTOR_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
