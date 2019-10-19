import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Scanning/index.js";

export default {
  title: "Cards|Scanning",
};
export const Scanning = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
