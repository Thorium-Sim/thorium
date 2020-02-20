import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/JrSensors/index.js";
import SensorsMock from "mocks/cards/Sensors.mock.js";

export default {
  title: "Cards|Jr/JrSensors",
};
export const JrSensors = () => (
  <StorybookWrapper mocks={SensorsMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
