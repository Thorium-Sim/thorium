import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/ProbeScience/index.js";
import CoreComponent from "../components/views/ProbeScience/core.js";

export default {
  title: "Cards|ProbeScience",
};
export const ProbeScience = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
