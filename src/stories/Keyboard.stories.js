import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Keyboard/index.js";

export default {
  title: "Cards|Keyboard",
};
export const Keyboard = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
