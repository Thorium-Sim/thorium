import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  PARTICLE_QUERY,
  PARTICLE_SUB,
} from "../components/views/ParticleDetector/index.js";
import CoreComponent, {
  PARTICLE_CORE_QUERY,
  PARTICLE_CONTACTS_CORE_SUB,
} from "components/views/ParticleDetector/particleDetectorCore.js";

export default {
  title: "Cards|Sensors/ParticleDetector",
};
export const ParticleDetector = () => (
  <StorybookWrapper queries={[PARTICLE_QUERY, PARTICLE_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore
    queries={[PARTICLE_CORE_QUERY, PARTICLE_CONTACTS_CORE_SUB]}
  >
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
