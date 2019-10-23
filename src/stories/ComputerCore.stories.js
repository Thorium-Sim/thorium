import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  COMPUTER_CORE_QUERY,
  COMPUTER_CORE_SUB,
} from "../components/views/ComputerCore/index.js";
import CoreComponent, {
  COMPUTER_CORE_CORE_QUERY,
  COMPUTER_CORE_CORE_SUB,
} from "../components/views/ComputerCore/core.js";

export default {
  title: "Cards|ComputerCore",
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
