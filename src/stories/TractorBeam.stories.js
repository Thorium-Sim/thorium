import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  TRACTORBEAM_QUERY,
  TRACTORBEAM_SUB,
} from "../components/views/TractorBeam/index.js";
import CoreComponent, {
  TRACTORBEAM_CORE_QUERY,
  TRACTORBEAM_CORE_SUB,
} from "../components/views/TractorBeam/core.js";

export default {
  title: "Cards|Operations/TractorBeam",
};
export const TractorBeam = () => (
  <StorybookWrapper queries={[TRACTORBEAM_QUERY, TRACTORBEAM_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore
    queries={[TRACTORBEAM_CORE_QUERY, TRACTORBEAM_CORE_SUB]}
  >
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
