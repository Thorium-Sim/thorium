import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  NAVIGATION_QUERY,
  NAVIGATION_SUB,
} from "../components/views/Navigation/index.js";
import CoreComponent, {
  NAVIGATION_CORE_QUERY,
  NAVIGATION_CORE_SUB,
} from "../components/views/Navigation/core.js";

export default {
  title: "Cards|Navigation/Navigation",
};
export const Navigation = () => (
  <StorybookWrapper queries={[NAVIGATION_QUERY, NAVIGATION_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[NAVIGATION_CORE_QUERY, NAVIGATION_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
