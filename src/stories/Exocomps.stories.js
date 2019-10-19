import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Exocomps/index.js";
import CoreComponent from "../components/views/Exocomps/core.js";

export default {
  title: "Cards|Exocomps",
};
export const Exocomps = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
