import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  SHIELD_QUERY,
  SHIELD_SUB,
} from "../components/views/ShieldControl/index.js";
import CoreComponent, {
  SHIELD_CORE_QUERY,
  SHIELD_CORE_SUB,
} from "../components/views/ShieldControl/core.js";

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
