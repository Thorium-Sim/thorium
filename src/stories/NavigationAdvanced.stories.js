import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/NavigationAdvanced/index.js";

export default {
  title: "Cards|NavigationAdvanced",
};
export const NavigationAdvanced = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
