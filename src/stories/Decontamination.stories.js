import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  DECON_QUERY,
  DECON_SUB,
} from "../components/views/Decontamination/index.js";
import CoreComponent, {
  DECON_CORE_QUERY,
  DECON_CORE_SUB,
} from "../components/views/Decontamination/core.js";

export default {
  title: "Cards|Medical/Decontamination",
};
export const Decontamination = () => (
  <StorybookWrapper queries={[DECON_QUERY, DECON_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[DECON_CORE_QUERY, DECON_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
