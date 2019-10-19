import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/CodeCyphers/index.js";
import CoreComponent from "../components/views/CodeCyphers/core.js";

export default {
  title: "Cards|CodeCyphers",
};
export const CodeCyphers = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
