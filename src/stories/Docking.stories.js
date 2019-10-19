import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Docking/index.js";
import CoreComponent from "../components/views/Docking/core.js";

export default {
  title: "Cards|Docking",
};
export const Docking = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
