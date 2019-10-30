import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component, {
  RECORDS_QUERY,
  RECORDS_SUB,
} from "../components/views/Records/index.js";
import CoreComponent, {
  RECORDS_CORE_SUB,
  RECORDS_CORE_QUERY,
} from "../components/views/Records/core.js";

export default {
  title: "Cards|Command/Records",
};
export const Records = () => (
  <StorybookWrapper queries={[RECORDS_QUERY, RECORDS_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[RECORDS_CORE_QUERY, RECORDS_CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
