import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/NavigationAdvanced/index.js";

export default {
  title: "Cards|NavigationAdvanced",
};
export const NavigationAdvanced = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
