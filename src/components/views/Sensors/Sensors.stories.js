import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/Sensors/index.js";
import CoreComponent from "components/views/Sensors/core.js";
import SensorsMock from "mocks/cards/Sensors.mock.js";
export default {
  title: "Cards|Sensors/Sensors",
};
export const Sensors = () => (
  <StorybookWrapper mocks={SensorsMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={SensorsMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
