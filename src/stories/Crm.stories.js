import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Crm/index.js";

export default {
  title: "Cards|Crm",
};
export const Crm = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
