import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/SensorScans/index.js";

export default {
  title: "Cards|SensorScans",
};
export const SensorScans = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
