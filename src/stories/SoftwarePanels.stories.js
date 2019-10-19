import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/SoftwarePanels/index.js";

export default {
  title: "Cards|SoftwarePanels",
};
export const SoftwarePanels = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
