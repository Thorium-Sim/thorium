import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  COMPUTER_CORE_QUERY,
  COMPUTER_CORE_SUB,
} from "components/views/ComputerCore/index.js";
import CoreComponent, {
  COMPUTER_CORE_CORE_QUERY,
  COMPUTER_CORE_CORE_SUB,
} from "components/views/ComputerCore/core.js";

export default {
  title: "Cards|Operations/ComputerCore",
};
export const ComputerCore = () => (
  <StorybookWrapper queries={[COMPUTER_CORE_QUERY, COMPUTER_CORE_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore
    queries={[COMPUTER_CORE_CORE_QUERY, COMPUTER_CORE_CORE_SUB]}
  >
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
