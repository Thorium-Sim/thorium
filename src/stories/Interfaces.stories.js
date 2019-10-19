import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Interfaces/index.js";

export default {
  title: "Cards|Interfaces",
};
export const Interfaces = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
