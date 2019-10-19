import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/ProbeScience/index.js";
import CoreComponent from "../components/views/ProbeScience/core.js";

export default {
  title: "Cards|ProbeScience",
};
export const ProbeScience = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
