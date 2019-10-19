import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/CommShortRange/index.js";
import CoreComponent from "../components/views/CommShortRange/core.js";

export default {
  title: "Cards|CommShortRange",
};
export const CommShortRange = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
