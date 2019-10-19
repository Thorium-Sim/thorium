import React from "react";

import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";

import CoreComponent from "../components/views/Heat/core.js";

export default {
  title: "Cards|Heat",
};

export const Core = () => (
  <StorybookWrapperCore>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
