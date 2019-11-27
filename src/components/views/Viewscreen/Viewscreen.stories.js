import React from "react";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import CoreComponent, {
  VIEWSCREEN_CORE_QUERY,
  VIEWSCREEN_CORE_SUB,
} from "components/views/Viewscreen/core.js";

export default {
  title: "Cards|Core/Viewscreen",
};
export const Core = () => (
  <StorybookWrapperCore queries={[VIEWSCREEN_CORE_QUERY, VIEWSCREEN_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
