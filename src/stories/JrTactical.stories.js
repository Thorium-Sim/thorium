import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/JrTactical/index.js";

export default {
  title: "Cards|JrTactical",
};
export const JrTactical = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
