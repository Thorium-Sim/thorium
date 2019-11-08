import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Sensors/index.js";
import CoreComponent from "../components/views/Sensors/core.js";
import SensorsMock from "../mocks/cards/Sensors.mock.js";
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
