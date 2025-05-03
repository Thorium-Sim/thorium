import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component, {
  EXOCOMP_QUERY,
  EXOCOMP_SUB,
} from "components/views/Exocomps/index.js";
import CoreComponent, {
  EXOCOMP_CORE_QUERY,
  EXOCOMP_CORE_SUB,
} from "components/views/Exocomps/core.js";

export default {
  title: "Cards|Engineering/Exocomps",
};
export const Exocomps = () => (
  <StorybookWrapper queries={[EXOCOMP_QUERY, EXOCOMP_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[EXOCOMP_CORE_QUERY, EXOCOMP_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
