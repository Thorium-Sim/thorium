import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/SecurityScans/index.js";

export default {
  title: "Cards|SecurityScans",
};
export const SecurityScans = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
