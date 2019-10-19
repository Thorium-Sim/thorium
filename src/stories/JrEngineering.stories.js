import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/JrEngineering/index.js";

export default {
  title: "Cards|JrEngineering",
};
export const JrEngineering = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
