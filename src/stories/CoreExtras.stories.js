import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/CoreExtras/index.js";

export default {
  title: "Cards|CoreExtras",
};
export const CoreExtras = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
