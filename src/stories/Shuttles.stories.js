import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  SHUTTLE_QUERY,
  SHUTTLE_SUB,
} from "../components/views/Shuttles/index.js";
import CoreComponent, {
  SHUTTLE_CORE_QUERY,
  SHUTTLE_CORE_SUB,
} from "../components/views/Shuttles/core.js";

export default {
  title: "Cards|Operations/Shuttles",
};
export const Shuttles = () => (
  <StorybookWrapper queries={[SHUTTLE_QUERY, SHUTTLE_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[SHUTTLE_CORE_QUERY, SHUTTLE_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
