import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  CRM_MOVEMENT_QUERY,
  CRM_MOVEMENT_SUBSCRIPTION,
} from "components/views/CrmFighter/index.js";
import CoreComponent, {
  CRM_FIGHTER_CORE_QUERY,
  CRM_FIGHTER_CORE_SUB,
} from "components/views/CrmFighter/core.js";
import {
  CRM_FIGHTER_DATA_QUERY,
  CRM_FIGHTER_DATA_SUB,
} from "components/views/CrmFighter/fighterData.js";

export default {
  title: "Cards|Weapons/CrmFighter",
};
export const CrmFighter = () => (
  <StorybookWrapper
    queries={[
      CRM_MOVEMENT_QUERY,
      CRM_MOVEMENT_SUBSCRIPTION,
      [CRM_FIGHTER_DATA_QUERY, [], {clientId: "test", simulatorId: "test"}],
      [CRM_FIGHTER_DATA_SUB, [], {clientId: "test", simulatorId: "test"}],
    ]}
  >
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore
    queries={[CRM_FIGHTER_CORE_QUERY, CRM_FIGHTER_CORE_SUB]}
  >
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
