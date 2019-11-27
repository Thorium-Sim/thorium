import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component, {
  JR_COMM_QUERY,
  JR_COMM_SUB,
} from "components/views/JrComm/index.js";

export default {
  title: "Cards|Jr/JrComm",
};
export const JrComm = () => (
  <StorybookWrapper queries={[JR_COMM_QUERY, JR_COMM_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
