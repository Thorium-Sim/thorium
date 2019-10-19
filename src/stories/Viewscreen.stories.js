import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Viewscreen/index.js";
import CoreComponent from "../components/views/Viewscreen/core.js";

export default {
  title: "Cards|Viewscreen",
};
export const Viewscreen = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
