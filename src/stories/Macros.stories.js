import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Macros/index.js";

export default {
  title: "Cards|Macros",
};
export const Macros = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
