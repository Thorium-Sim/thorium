import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  TRANSPORTERS_QUERY,
  TRANSPORTER_SUB,
} from "components/views/Transporters/index.js";
import CoreComponent, {
  TRANSPORTERS_CORE_QUERY,
  TRANSPORTER_CORE_SUB,
} from "components/views/Transporters/core.js";

export default {
  title: "Cards|Operations/Transporters",
};
export const Transporters = () => (
  <StorybookWrapper queries={[TRANSPORTERS_QUERY, TRANSPORTER_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore
    queries={[TRANSPORTERS_CORE_QUERY, TRANSPORTER_CORE_SUB]}
  >
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
