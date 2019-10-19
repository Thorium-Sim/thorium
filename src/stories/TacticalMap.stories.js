import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/TacticalMap/index.js";

export default {
  title: "Cards|TacticalMap",
};
export const TacticalMap = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
