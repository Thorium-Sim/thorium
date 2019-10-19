import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/CoreExtras/index.js";

export default {
  title: "Cards|CoreExtras",
};
export const CoreExtras = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
