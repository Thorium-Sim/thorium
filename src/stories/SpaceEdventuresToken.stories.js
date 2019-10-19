import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/SpaceEdventuresToken/index.js";
import CoreComponent from "../components/views/SpaceEdventuresToken/core.js";

export default {
  title: "Cards|SpaceEdventuresToken",
};
export const SpaceEdventuresToken = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
