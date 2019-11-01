import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  TRANSWARP_QUERY,
  TRANSWARP_HEAT_SUB,
  TRANSWARP_SUB,
} from "../components/views/Transwarp/index.js";
import CoreComponent, {
  TRANSWARP_CORE_QUERY,
  TRANSWARP_CORE_SUB,
} from "../components/views/Transwarp/core.js";

export default {
  title: "Cards|Navigation/Transwarp",
};
export const Transwarp = () => (
  <StorybookWrapper
    queries={[TRANSWARP_QUERY, TRANSWARP_HEAT_SUB, TRANSWARP_SUB]}
  >
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[TRANSWARP_CORE_QUERY, TRANSWARP_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
