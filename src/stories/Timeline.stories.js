import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Timeline/index.js";

export default {
  title: "Cards|Timeline",
};
export const Timeline = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
