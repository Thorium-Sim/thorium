import React from "react";

import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";

import CoreComponent, {
  KEYPAD_QUERY,
  KEYPAD_SUB,
} from "components/views/Keypad/core.js";

export default {
  title: "Cards|Mobile/Keypad",
};

export const Core = () => (
  <StorybookWrapperCore queries={[KEYPAD_QUERY, KEYPAD_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
