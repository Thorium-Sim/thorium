import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/BridgeMap/index.js";
import CoreComponent from "../components/views/BridgeMap/core.js";

export default {
  title: "Cards|BridgeMap",
};
export const BridgeMap = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
