import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/SoundsTester/index.js";

export default {
  title: "Cards|SoundsTester",
};
export const SoundsTester = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
