import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Lighting/index.js";

export default {
  title: "Cards|Lighting",
};
export const Lighting = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
