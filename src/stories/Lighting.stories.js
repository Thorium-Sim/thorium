import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component, {
  LIGHTING_QUERY,
  LIGHTING_SUB,
} from "../components/views/Lighting/index.js";

export default {
  title: "Cards|Core/Lighting",
};
export const Lighting = () => (
  <StorybookWrapper queries={[LIGHTING_QUERY, LIGHTING_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
