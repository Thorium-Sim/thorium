import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/JrTactical/index.js";

export default {
  title: "Cards|JrTactical",
};
export const JrTactical = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
