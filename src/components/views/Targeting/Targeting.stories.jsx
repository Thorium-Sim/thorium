import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/Targeting/index.js";
import CoreComponent from "components/views/Targeting/core.js";
import TargetingMock from "mocks/cards/Targeting.mock.js";

export default {
  title: "Cards|Weapons/Targeting",
};
export const Targeting = () => (
  <StorybookWrapper mocks={TargetingMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={TargetingMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
