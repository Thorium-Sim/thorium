import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Status/index.js";

export default {
  title: "Cards|Status",
};
export const Status = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
