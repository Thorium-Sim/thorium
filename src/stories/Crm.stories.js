import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component, {
  CRM_QUERY,
  CRM_CLIENT_SUB,
  CRM_SUB,
} from "../components/views/Crm/index.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import CoreComp, {
  CRM_CORE_QUERY,
  CRM_CORE_SUB,
} from "components/views/Crm/core/index.js";

export default {
  title: "Cards|Weapons/Crm",
};
export const Crm = () => (
  <StorybookWrapper queries={[CRM_QUERY, CRM_CLIENT_SUB, CRM_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => {
  return (
    <StorybookWrapperCore queries={[CRM_CORE_QUERY, CRM_CORE_SUB]}>
      <CoreComp {...baseProps} />
    </StorybookWrapperCore>
  );
};
