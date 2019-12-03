import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/ProbeNetwork/index.js";
import CoreComponent from "components/views/ProbeNetwork/core.js";
import ProbeNetworkMock from "mocks/cards/ProbeNetwork.mock";
export default {
  title: "Cards|Sensors/ProbeNetwork",
};
export const ProbeNetwork = () => (
  <StorybookWrapper mocks={ProbeNetworkMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={ProbeNetworkMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
