import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Tasks/index.js";

export default {
  title: "Cards|Tasks",
};
export const Tasks = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
