import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Isochips/index.js";

export default {
  title: "Cards|Isochips",
};
export const Isochips = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
