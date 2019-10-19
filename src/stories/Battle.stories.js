import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Battle/index.js";

export default {
  title: "Cards|Battle",
};
export const Battle = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
