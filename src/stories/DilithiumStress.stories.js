import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component, {
  DILITHIUM_QUERY,
  DILITHIUM_SUB,
} from "../components/views/DilithiumStress/index.js";

export default {
  title: "Cards|Operations/DilithiumStress",
};
export const DilithiumStress = () => (
  <StorybookWrapper queries={[DILITHIUM_QUERY, DILITHIUM_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
