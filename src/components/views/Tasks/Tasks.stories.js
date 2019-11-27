import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";

import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/Tasks/index.js";
import CoreComponent from "components/views/Tasks/core/index";
import TasksMock from "mocks/cards/Tasks.mock.js";

export default {
  title: "Cards|Engineering/Tasks",
};

export const Tasks = () => (
  <StorybookWrapper mocks={TasksMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={TasksMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
