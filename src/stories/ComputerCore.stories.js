import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
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
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
