import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/PowerDistribution/index.js";
import CoreComponent from "../components/views/PowerDistribution/core.js";

export default {
  title: "Cards|PowerDistribution",
};
export const PowerDistribution = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
