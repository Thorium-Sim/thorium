import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/CommInterception/index.js";
import CoreComponent from "components/views/CommInterception/core.js";
import CommInterceptionMock from "mocks/cards/CommInterception.mock.js";

export default {
  title: "Cards|Communications/CommInterception",
};
export const CommInterception = () => (
  <StorybookWrapper mocks={CommInterceptionMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={CommInterceptionMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
