import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/Keyboard/index.js";

export default {
  title: "Cards|Core/Keyboard",
};
export const Keyboard = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
