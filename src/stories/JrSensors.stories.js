import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/JrSensors/index.js";

export default {
  title: "Cards|JrSensors",
};
export const JrSensors = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
