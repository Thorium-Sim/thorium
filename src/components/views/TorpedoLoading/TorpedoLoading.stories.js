import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/TorpedoLoading/index.js";
import CoreComponent from "components/views/TorpedoLoading/core.js";
import TorpedoLoadingMock from "mocks/cards/TorpedoLoading.mock";
export default {
  title: "Cards|Weapons/TorpedoLoading",
};
export const TorpedoLoading = () => (
  <StorybookWrapper mocks={TorpedoLoadingMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={TorpedoLoadingMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
