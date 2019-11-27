import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  ENGINE_QUERY,
  SPEEDCHANGE_SUB,
  HEATCHANGE_SUB,
} from "components/views/EngineControl/index.js";
import CoreComponent, {
  ENGINE_CORE_QUERY,
  SPEEDCHANGE_CORE_SUB,
} from "components/views/EngineControl/core.js";

export default {
  title: "Cards|Navigation/EngineControl",
};
export const EngineControl = () => (
  <StorybookWrapper queries={[ENGINE_QUERY, SPEEDCHANGE_SUB, HEATCHANGE_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[ENGINE_CORE_QUERY, SPEEDCHANGE_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
