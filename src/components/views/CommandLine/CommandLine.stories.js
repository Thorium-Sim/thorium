import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/CommandLine/index.js";
import CoreComponent from "components/views/CommandLine/core.js";
import CommandLineMock from "mocks/cards/CommandLine.mock.js";

export default {
  title: "Cards|Operations/CommandLine",
};
export const CommandLine = () => (
  <StorybookWrapper mocks={CommandLineMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={CommandLineMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
