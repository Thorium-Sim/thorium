import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  OFFICER_LOG_QUERY,
  OFFICER_LOG_SUB,
} from "../components/views/OfficerLog/index.js";
import CoreComponent, {
  OFFICER_LOG_CORE_QUERY,
  OFFICER_LOG_CORE_SUB,
} from "../components/views/OfficerLog/core.js";

export default {
  title: "Cards|Crew/OfficerLog",
};
export const OfficerLog = () => (
  <StorybookWrapper queries={[OFFICER_LOG_QUERY, OFFICER_LOG_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore
    queries={[OFFICER_LOG_CORE_QUERY, OFFICER_LOG_CORE_SUB]}
  >
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
