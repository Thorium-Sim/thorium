import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
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
  <StorybookWrapperCore>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
