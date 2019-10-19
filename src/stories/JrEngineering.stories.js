import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/JrEngineering/index.js";

export default {
  title: "Cards|JrEngineering",
};
export const JrEngineering = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
