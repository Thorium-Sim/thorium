import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/CoolantControl/index.js";

export default {
  title: "Cards|CoolantControl",
};
export const CoolantControl = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
