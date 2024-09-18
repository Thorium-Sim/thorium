import React from "react";

import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";

import CoreComponent, {
  REMOTE_ACCESS_QUERY,
  REMOTE_ACCESS_SUB,
} from "components/views/RemoteAccess/core.js";

export default {
  title: "Cards|Engineering/RemoteAccess",
};

export const Core = () => (
  <StorybookWrapperCore queries={[REMOTE_ACCESS_QUERY, REMOTE_ACCESS_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
