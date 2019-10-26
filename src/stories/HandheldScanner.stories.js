import React from "react";

import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";

import CoreComponent, {
  HANDHELD_SCANNER_QUERY,
  HANDHELD_SCANNER_SUBSCRIPTION,
} from "../components/views/HandheldScanner/core.js";

export default {
  title: "Cards|Mobile/HandheldScanner",
};

export const Core = () => (
  <StorybookWrapperCore
    queries={[HANDHELD_SCANNER_QUERY, HANDHELD_SCANNER_SUBSCRIPTION]}
  >
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
