import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/DilithiumStress/index.js";

export default {
  title: "Cards|DilithiumStress",
};
export const DilithiumStress = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
