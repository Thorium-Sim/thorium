import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/JrComm/index.js";

export default {
  title: "Cards|JrComm",
};
export const JrComm = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
