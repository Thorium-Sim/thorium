import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component, {
  LIBRARY_SUB,
  LIBRARY_QUERY,
} from "components/views/Library/index.js";

export default {
  title: "Cards|Command/Library",
};
export const Library = () => (
  <StorybookWrapper
    queries={[
      [LIBRARY_SUB, [], {simulatorId: "test", type: "general"}],
      [LIBRARY_QUERY, [], {simulatorId: "test", type: "general"}],
    ]}
  >
    <Component {...baseProps} />
  </StorybookWrapper>
);
