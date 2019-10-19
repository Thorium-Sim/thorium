import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/SoftwarePanels/index.js";

export default {
  title: "Cards|SoftwarePanels",
};
export const SoftwarePanels = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
