import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Sickbay/index.js";

export default {
  title: "Cards|Sickbay",
};
export const Sickbay = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
