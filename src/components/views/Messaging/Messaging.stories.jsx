import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  MESSAGING_QUERY,
  MESSAGING_SUB,
  MESSAGING_TEAMS_SUB,
} from "components/views/Messaging/index.js";
import CoreComponent, {
  MESSAGING_CORE_QUERY,
  MESSAGING_CORE_SUB,
  MESSAGING_TEAMS_CORE_SUB,
} from "components/views/Messaging/core/index.js";

export default {
  title: "Cards|Crew/Messaging",
};
export const Messaging = () => (
  <StorybookWrapper
    queries={[
      [MESSAGING_QUERY, [], {simulatorId: "test", station: "Test Station"}],
      [MESSAGING_SUB, [], {simulatorId: "test", station: "Test Station"}],
      MESSAGING_TEAMS_SUB,
    ]}
  >
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore
    queries={[
      MESSAGING_CORE_QUERY,
      MESSAGING_CORE_SUB,
      MESSAGING_TEAMS_CORE_SUB,
    ]}
  >
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
