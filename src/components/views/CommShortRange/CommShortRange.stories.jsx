import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/CommShortRange/index.js";
import CoreComponent from "components/views/CommShortRange/core.js";
import CommShortRangeMock from "mocks/cards/CommShortRange.mock.js";

export default {
  title: "Cards|Communications/CommShortRange",
};
export const CommShortRange = () => (
  <StorybookWrapper mocks={CommShortRangeMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={CommShortRangeMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
