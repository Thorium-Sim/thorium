import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
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
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
