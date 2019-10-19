import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/JumpDrive/index.js";
import CoreComponent from "../components/views/JumpDrive/core.js";

export default {
  title: "Cards|JumpDrive",
};
export const JumpDrive = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
