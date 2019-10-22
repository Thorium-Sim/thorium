import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/CommInterception/index.js";
import CoreComponent from "../components/views/CommInterception/core.js";
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
