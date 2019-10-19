import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/ComputerCore/index.js";
import CoreComponent from "../components/views/ComputerCore/core.js";

export default {
  title: "Cards|ComputerCore",
};
export const ComputerCore = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
