import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/StealthField/index.js";
import CoreComponent from "components/views/StealthField/core.js";
import StealthFieldMock from "mocks/cards/StealthField.mock";
export default {
  title: "Cards|Operations/StealthField",
};
export const StealthField = () => (
  <StorybookWrapper mocks={StealthFieldMock}>
    <Component {...baseProps} test />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={StealthFieldMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
