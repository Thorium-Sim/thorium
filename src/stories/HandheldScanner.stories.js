import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";

import CoreComponent from "../components/views/HandheldScanner/core.js";

export default {
  title: "Cards|HandheldScanner",
};

export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
