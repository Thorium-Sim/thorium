import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Library/index.js";

export default {
  title: "Cards|Library",
};
export const Library = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
