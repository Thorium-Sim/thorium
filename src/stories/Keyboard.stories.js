import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Keyboard/index.js";

export default {
  title: "Cards|Core/Keyboard",
};
export const Keyboard = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
