import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/ParticleDetector/index.js";
import CoreComponent from "../components/views/ParticleDetector/core.js";

export default {
  title: "Cards|ParticleDetector",
};
export const ParticleDetector = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
