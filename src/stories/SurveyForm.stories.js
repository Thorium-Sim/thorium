import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/SurveyForm/index.js";
import CoreComponent from "../components/views/SurveyForm/core.js";
import SurveyFormMock from "mocks/cards/SurveyForm.mock.js";

export default {
  title: "Cards|Crew/SurveyForm",
};
export const SurveyForm = () => (
  <StorybookWrapper mocks={SurveyFormMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={SurveyFormMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
