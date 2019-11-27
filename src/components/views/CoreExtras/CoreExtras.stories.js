import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/CoreExtras/index.js";
import {TIMESYNC_SUB} from "components/views/CoreExtras/timer.js";

export default {
  title: "Cards|Core/CoreExtras",
};
export const CoreExtras = () => (
  <StorybookWrapper queries={[TIMESYNC_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
