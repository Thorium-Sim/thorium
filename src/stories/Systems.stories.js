import React from "react";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import CoreComponent, {
  DAMAGE_REACTOR_CORE_SUB,
  DAMAGE_SYSTEMS_CORE_SUB,
  DAMAGE_SYSTEMS_CORE_QUERY,
} from "../components/views/DamageControl/core.js";

export default {
  title: "Cards|Operations/Systems",
};

export const Core = () => (
  <StorybookWrapperCore
    queries={[
      DAMAGE_REACTOR_CORE_SUB,
      DAMAGE_SYSTEMS_CORE_SUB,
      DAMAGE_SYSTEMS_CORE_QUERY,
    ]}
  >
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
