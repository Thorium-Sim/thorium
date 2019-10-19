import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Tasks/index.js";

export default {
  title: "Cards|Tasks",
};
export const Tasks = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
