import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Library/index.js";

export default {
  title: "Cards|Library",
};
export const Library = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
