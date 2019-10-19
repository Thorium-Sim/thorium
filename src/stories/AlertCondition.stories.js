import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/AlertCondition/index.js";
import CoreComponent from "../components/views/AlertCondition/core.js";

export default {
  title: "Cards|AlertCondition",
};
export const AlertCondition = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
