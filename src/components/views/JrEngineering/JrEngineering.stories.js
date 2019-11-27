import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component, {
  JR_SYSTEMS_QUERY,
  JR_SYSTEMS_SUB,
} from "components/views/JrEngineering/index.js";

export default {
  title: "Cards|Jr/JrEngineering",
};
export const JrEngineering = () => (
  <StorybookWrapper queries={[JR_SYSTEMS_QUERY, JR_SYSTEMS_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
