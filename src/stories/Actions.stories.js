import React from "react";

import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";

import CoreComponent from "../components/views/Actions/core.js";

export default {
  title: "Cards|Actions",
};

export const Core = () => (
  <StorybookWrapperCore>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
