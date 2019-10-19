import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/SubspaceField/index.js";
import CoreComponent from "../components/views/SubspaceField/core.js";

export default {
  title: "Cards|SubspaceField",
};
export const SubspaceField = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
