import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/JrOps/index.js";
import {
  JR_TRANSPORTERS_QUERY,
  JR_TRANSPORTER_SUB,
} from "components/views/JrOps/transporter.js";
import {
  JR_TRACTORBEAM_QUERY,
  JR_TRACTORBEAM_SUB,
} from "components/views/JrOps/tractorBeam.js";

export default {
  title: "Cards|Jr/JrOps",
};
export const JrOps = () => (
  <StorybookWrapper
    queries={[
      JR_TRANSPORTERS_QUERY,
      JR_TRANSPORTER_SUB,
      JR_TRACTORBEAM_QUERY,
      JR_TRACTORBEAM_SUB,
    ]}
  >
    <Component {...baseProps} />
  </StorybookWrapper>
);
