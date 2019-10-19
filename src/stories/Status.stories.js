import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Status/index.js";

export default {
  title: "Cards|Status",
};
export const Status = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
