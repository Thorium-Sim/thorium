import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/AlertCondition/index.js";
import CoreComponent from "components/views/AlertCondition/core.js";
import {alertConditionMocks} from "mocks/cards/AlertCondition.mock.js";

export default {
  title: "Cards|Command/AlertCondition",
};
export const AlertCondition = () => (
  <StorybookWrapper mocks={alertConditionMocks}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={alertConditionMocks}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
