import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/SoundsTester/index.js";

export default {
  title: "Cards|SoundsTester",
};
export const SoundsTester = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
