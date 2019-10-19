import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/JrFlight/index.js";

export default {
  title: "Cards|JrFlight",
};
export const JrFlight = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
