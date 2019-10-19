import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/TorpedoLoading/index.js";
import CoreComponent from "../components/views/TorpedoLoading/core.js";

export default {
  title: "Cards|TorpedoLoading",
};
export const TorpedoLoading = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
