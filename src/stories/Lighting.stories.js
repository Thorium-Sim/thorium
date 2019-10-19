import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Lighting/index.js";

export default {
  title: "Cards|Lighting",
};
export const Lighting = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
