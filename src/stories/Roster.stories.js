import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Roster/index.js";

export default {
  title: "Cards|Roster",
};
export const Roster = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
