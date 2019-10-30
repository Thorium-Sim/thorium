import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component, {
  ROSTER_QUERY,
  ROSTER_SUB,
} from "../components/views/Roster/index.js";

export default {
  title: "Cards|Command/Roster",
};
export const Roster = () => (
  <StorybookWrapper queries={[ROSTER_QUERY, ROSTER_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
