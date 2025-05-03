import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  DAMAGE_REPORT_QUERY,
  DAMAGE_SYSTEMS_SUB,
  DAMAGE_TASK_REPORT_SUB,
} from "components/views/DamageControl/index.js";

export default {
  title: "Cards|Engineering/DamageControl",
};
export const DamageControl = () => (
  <StorybookWrapper
    queries={[
      [DAMAGE_REPORT_QUERY, [], {simulatorId: "test", which: "default"}],
      [DAMAGE_SYSTEMS_SUB, [], {simulatorId: "test", which: "default"}],
      [DAMAGE_TASK_REPORT_SUB, [], {simulatorId: "test", which: "default"}],
    ]}
  >
    <Component {...baseProps} />
  </StorybookWrapper>
);
