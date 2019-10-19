import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Sickbay/index.js";

export default {
  title: "Cards|Sickbay",
};
export const Sickbay = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
