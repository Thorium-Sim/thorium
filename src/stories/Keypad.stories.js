import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";

import CoreComponent from "../components/views/Keypad/core.js";

export default {
  title: "Cards|Keypad",
};

export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
