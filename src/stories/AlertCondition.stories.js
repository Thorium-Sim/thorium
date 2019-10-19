import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/AlertCondition/index.js";
import CoreComponent from "../components/views/AlertCondition/core.js";
import {
  alertConditionMocks,
  alertConditionCoreMocks,
} from "mocks/cards/AlertCondition.js";

export default {
  title: "Cards|AlertCondition",
};
export const AlertCondition = () => (
  <StorybookWrapper mocks={alertConditionMocks}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={alertConditionCoreMocks}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
