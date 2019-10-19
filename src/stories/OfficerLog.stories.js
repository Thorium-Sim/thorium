import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/OfficerLog/index.js";
import CoreComponent from "../components/views/OfficerLog/core.js";

export default {
  title: "Cards|OfficerLog",
};
export const OfficerLog = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
