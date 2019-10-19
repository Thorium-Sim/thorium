import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";

import CoreComponent from "../components/views/TaskReports/core.js";

export default {
  title: "Cards|TaskReports",
};

export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
