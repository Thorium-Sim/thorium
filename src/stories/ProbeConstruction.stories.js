import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/ProbeConstruction/index.js";

export default {
  title: "Cards|ProbeConstruction",
};
export const ProbeConstruction = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
