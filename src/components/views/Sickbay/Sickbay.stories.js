import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component, {
  SICKBAY_QUERY,
  SICKBAY_SUB,
  SICKBAY_CREW_SUB,
} from "components/views/Sickbay/index.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import CoreComponent, {
  SICKBAY_CORE_QUERY,
  SICKBAY_CORE_SUB,
} from "components/views/Sickbay/core";

export default {
  title: "Cards|Medical/Sickbay",
};
export const Sickbay = () => (
  <StorybookWrapper queries={[SICKBAY_QUERY, SICKBAY_SUB, SICKBAY_CREW_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);

export const Core = () => (
  <StorybookWrapperCore queries={[SICKBAY_CORE_QUERY, SICKBAY_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
