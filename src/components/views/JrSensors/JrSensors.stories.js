import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component, {
  JR_SENSOR_QUERY,
  JR_SENSOR_SUB,
} from "components/views/JrSensors/index.js";

export default {
  title: "Cards|Jr/JrSensors",
};
export const JrSensors = () => (
  <StorybookWrapper queries={[JR_SENSOR_QUERY, JR_SENSOR_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
