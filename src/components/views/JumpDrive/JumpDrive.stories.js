import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  JUMP_DRIVE_QUERY,
  JUMP_DRIVE_SUB,
} from "components/views/JumpDrive/index.js";
import CoreComponent, {
  JUMP_DRIVE_CORE_QUERY,
  JUMP_DRIVE_CORE_SUB,
} from "components/views/JumpDrive/core.js";

export default {
  title: "Cards|Navigation/JumpDrive",
};
export const JumpDrive = () => (
  <StorybookWrapper queries={[JUMP_DRIVE_QUERY, JUMP_DRIVE_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[JUMP_DRIVE_CORE_QUERY, JUMP_DRIVE_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
