import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component, {
  JR_SENSOR_QUERY,
  JR_SENSOR_SUB,
} from "../components/views/JrSensors/index.js";

export default {
  title: "Cards|Jr/JrSensors",
};
export const JrSensors = () => (
  <StorybookWrapper queries={[JR_SENSOR_QUERY, JR_SENSOR_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
