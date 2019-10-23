import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/CommInternal/index.js";
import CoreComponent from "../components/views/CommInternal/core.js";
import CommInternalMock from "mocks/cards/CommInternal.mock.js";

export default {
  title: "Cards|Communications/CommInternal",
};
export const CommInternal = () => (
  <StorybookWrapper mocks={CommInternalMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={CommInternalMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
