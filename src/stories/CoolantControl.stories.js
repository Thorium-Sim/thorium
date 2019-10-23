import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component, {
  COOLANT_QUERY,
  COOLANT_SUB,
  COOLANT_SYSTEM_SUB,
} from "../components/views/CoolantControl/index.js";

export default {
  title: "Cards|Engineering/CoolantControl",
};
export const CoolantControl = () => (
  <StorybookWrapper queries={[COOLANT_QUERY, COOLANT_SUB, COOLANT_SYSTEM_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
