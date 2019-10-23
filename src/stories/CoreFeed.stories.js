import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component, {
  COREFEED_QUERY,
  COREFEED_SUB,
} from "../components/views/CoreFeed/index.js";

export default {
  title: "Cards|Core/CoreFeed",
};
export const CoreFeed = () => (
  <StorybookWrapper queries={[COREFEED_QUERY, COREFEED_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
