import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/BridgeMap/index.js";
import CoreComponent from "components/views/BridgeMap/core.js";
import BridgeMapMock from "mocks/cards/BridgeMap.mock.js";

export default {
  title: "Cards|Command/BridgeMap",
};
export const BridgeMap = () => (
  <StorybookWrapper mocks={BridgeMapMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={BridgeMapMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
