import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Scanning/index.js";

export default {
  title: "Cards|Scanning",
};
export const Scanning = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
