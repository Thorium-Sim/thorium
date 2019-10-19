import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/ProbeConstruction/index.js";

export default {
  title: "Cards|ProbeConstruction",
};
export const ProbeConstruction = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
