import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  PHASERS_QUERY,
  PHASERS_SUB,
} from "../components/views/PhaserCharging/index.js";
import CoreComponent, {
  PHASERS_CORE_QUERY,
  PHASERS_CORE_SUB,
} from "../components/views/PhaserCharging/core.js";

export default {
  title: "Cards|Weapons/PhaserCharging",
};
export const PhaserCharging = () => (
  <StorybookWrapper queries={[PHASERS_QUERY, PHASERS_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[PHASERS_CORE_QUERY, PHASERS_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
