import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/DockingPorts/index.js";
import CoreComponent from "../components/views/DockingPorts/core.js";

export default {
  title: "Cards|DockingPorts",
};
export const DockingPorts = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
