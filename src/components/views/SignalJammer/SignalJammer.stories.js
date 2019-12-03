import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  SIGNAL_JAMMER_QUERY,
  SIGNAL_JAMMER_SUB,
} from "components/views/SignalJammer/index.js";
import CoreComponent, {
  SIGNAL_JAMMER_CORE_QUERY,
  SIGNAL_JAMMER_CORE_SUB,
} from "components/views/SignalJammer/core.js";

export default {
  title: "Cards|Communications/SignalJammer",
};
export const SignalJammer = () => (
  <StorybookWrapper queries={[SIGNAL_JAMMER_QUERY, SIGNAL_JAMMER_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);

export const Core = () => (
  <StorybookWrapperCore
    queries={[SIGNAL_JAMMER_CORE_QUERY, SIGNAL_JAMMER_CORE_SUB]}
  >
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
