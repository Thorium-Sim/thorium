import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component, {
  LIGHTING_QUERY,
  LIGHTING_SUB,
} from "components/views/Lighting/index.js";

export default {
  title: "Cards|Core/Lighting",
};
export const Lighting = () => (
  <StorybookWrapper queries={[LIGHTING_QUERY, LIGHTING_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
