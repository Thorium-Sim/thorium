import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  OBJECTIVE_QUERY,
  OBJECTIVE_SUB,
} from "components/views/Objectives/index.js";
import CoreComponent, {
  OBJECTIVE_CORE_SUB,
  OBJECTIVE_CORE_QUERY,
} from "components/views/Objectives/core.js";

export default {
  title: "Cards|Command/Objectives",
};
export const Objectives = () => (
  <StorybookWrapper queries={[OBJECTIVE_QUERY, OBJECTIVE_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[OBJECTIVE_CORE_QUERY, OBJECTIVE_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
