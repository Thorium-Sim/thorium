import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/CommDecoding/index.js";
import CoreComponent from "../components/views/CommDecoding/core.js";
import CommDecodingMock from "mocks/cards/CommDecoding.mock.js";

export default {
  title: "Cards|Communications/CommDecoding",
};
export const CommDecoding = () => (
  <StorybookWrapper mocks={CommDecodingMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={CommDecodingMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
