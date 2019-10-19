import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/DamageControl/index.js";
import CoreComponent from "../components/views/DamageControl/core.js";

export default {
  title: "Cards|DamageControl",
};
export const DamageControl = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
