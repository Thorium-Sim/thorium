import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";

import CoreComponent from "../components/views/Cards/core.js";

export default {
  title: "Cards|Cards",
};

export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
