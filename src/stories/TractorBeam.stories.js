import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/TractorBeam/index.js";
import CoreComponent from "../components/views/TractorBeam/core.js";

export default {
  title: "Cards|TractorBeam",
};
export const TractorBeam = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
