import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/SecurityScans/index.js";

export default {
  title: "Cards|SecurityScans",
};
export const SecurityScans = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
