import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/ProbeNetwork/index.js";
import CoreComponent from "../components/views/ProbeNetwork/core.js";

export default {
  title: "Cards|ProbeNetwork",
};
export const ProbeNetwork = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
