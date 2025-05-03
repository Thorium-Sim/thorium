import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  DECON_QUERY,
  DECON_SUB,
} from "components/views/Decontamination/index.js";
import CoreComponent, {
  DECON_CORE_QUERY,
  DECON_CORE_SUB,
} from "components/views/Decontamination/core.js";
import {DECON_OFFSET_MUTATION} from "components/views/Decontamination/program.js";

export default {
  title: "Cards|Medical/Decontamination",
};
export const Decontamination = () => (
  <StorybookWrapper
    queries={[
      DECON_QUERY,
      DECON_SUB,
      [DECON_OFFSET_MUTATION, [], {id: "test", offset: 0.5}],
    ]}
  >
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[DECON_CORE_QUERY, DECON_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
