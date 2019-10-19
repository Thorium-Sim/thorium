import React from "react";

import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";

import CoreComponent from "../components/views/Cards/core.js";

export default {
  title: "Cards|Cards",
};

export const Core = () => (
  <StorybookWrapperCore>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
