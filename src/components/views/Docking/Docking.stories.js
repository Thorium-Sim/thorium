import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  DOCKING_QUERY,
  DOCKING_SUB,
} from "components/views/Docking/index.js";
import CoreComponent, {
  DOCKING_CORE_QUERY,
  DOCKING_CORE_SUB,
} from "components/views/Docking/core.js";

export default {
  title: "Cards|Navigation/Docking",
};
export const Docking = () => (
  <StorybookWrapper queries={[DOCKING_QUERY, DOCKING_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[DOCKING_CORE_QUERY, DOCKING_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
