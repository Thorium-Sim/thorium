import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  SHIELD_QUERY,
  SHIELD_SUB,
} from "components/views/ShieldControl/index.js";
import CoreComponent, {
  SHIELD_CORE_QUERY,
  SHIELD_CORE_SUB,
} from "components/views/ShieldControl/core.js";

export default {
  title: "Cards|Weapons/ShieldControl",
};
export const ShieldControl = () => (
  <StorybookWrapper queries={[SHIELD_QUERY, SHIELD_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[SHIELD_CORE_QUERY, SHIELD_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
