import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/LongRangeComm/index.js";
import CoreComponent from "../components/views/LongRangeComm/core.js";

export default {
  title: "Cards|LongRangeComm",
};
export const LongRangeComm = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
