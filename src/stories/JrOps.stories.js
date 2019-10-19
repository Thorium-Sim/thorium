import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/JrOps/index.js";

export default {
  title: "Cards|JrOps",
};
export const JrOps = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
