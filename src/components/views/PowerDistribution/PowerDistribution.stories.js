import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  SYSTEMS_QUERY,
  SYSTEMS_SUB,
  REACTOR_SUB,
} from "components/views/PowerDistribution/index.js";

export default {
  title: "Cards|Operations/PowerDistribution",
};
export const PowerDistribution = () => (
  <StorybookWrapper queries={[SYSTEMS_QUERY, SYSTEMS_SUB, REACTOR_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
