import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Offline/index.js";

export default {
  title: "Cards|Offline",
};
export const Offline = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
