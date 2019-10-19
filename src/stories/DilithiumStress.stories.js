import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/DilithiumStress/index.js";

export default {
  title: "Cards|DilithiumStress",
};
export const DilithiumStress = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
