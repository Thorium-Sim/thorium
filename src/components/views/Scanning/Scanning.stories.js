import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component, {
  SENSOR_QUERY,
  SENSOR_SUB,
} from "components/views/Scanning/index.js";

export default {
  title: "Cards|Security/InternalScanning",
};
export const Scanning = () => (
  <StorybookWrapper
    queries={[
      [SENSOR_QUERY, [], {simulatorId: "test", domain: "internal"}],
      [SENSOR_SUB, [], {simulatorId: "test", domain: "internal"}],
    ]}
  >
    <Component {...baseProps} />
  </StorybookWrapper>
);
