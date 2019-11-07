import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Thx/index.js";
import CoreComponent from "../components/views/Thx/core.js";
import ThxMock from "mocks/cards/Thx.mock.js";

export default {
  title: "Cards|Weapons/Thx",
};
export const Thx = () => (
  <StorybookWrapper mocks={ThxMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={ThxMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
