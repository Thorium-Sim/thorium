import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/PhaserCharging/index.js";
import CoreComponent from "../components/views/PhaserCharging/core.js";

export default {
  title: "Cards|PhaserCharging",
};
export const PhaserCharging = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
