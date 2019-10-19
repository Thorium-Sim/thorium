import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/CrmFighter/index.js";
import CoreComponent from "../components/views/CrmFighter/core.js";

export default {
  title: "Cards|CrmFighter",
};
export const CrmFighter = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
