import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component, {
  COOLANT_QUERY,
  COOLANT_SUB,
  COOLANT_SYSTEM_SUB,
} from "components/views/CoolantControl/index.js";

export default {
  title: "Cards|Engineering/CoolantControl",
};
export const CoolantControl = () => (
  <StorybookWrapper queries={[COOLANT_QUERY, COOLANT_SUB, COOLANT_SYSTEM_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
