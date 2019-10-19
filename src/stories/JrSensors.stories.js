import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/JrSensors/index.js";

export default {
  title: "Cards|JrSensors",
};
export const JrSensors = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
