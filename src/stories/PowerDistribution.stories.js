import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  SYSTEMS_QUERY,
  SYSTEMS_SUB,
  REACTOR_SUB,
} from "../components/views/PowerDistribution/index.js";

export default {
  title: "Cards|Operations/PowerDistribution",
};
export const PowerDistribution = () => (
  <StorybookWrapper queries={[SYSTEMS_QUERY, SYSTEMS_SUB, REACTOR_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
