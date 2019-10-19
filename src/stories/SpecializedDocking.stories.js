import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/SpecializedDocking/index.js";
import CoreComponent from "../components/views/SpecializedDocking/core.js";

export default {
  title: "Cards|SpecializedDocking",
};
export const SpecializedDocking = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
