import React from "react";

import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";

import CoreComponent from "components/views/TaskReports/core.js";
import TaskReportsMock from "mocks/cards/TaskReports.mock.js";

export default {
  title: "Cards|Engineering/TaskReports",
};

export const Core = () => (
  <StorybookWrapperCore mocks={TaskReportsMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
