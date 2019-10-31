import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/SelfDestruct/index.js";
import CoreComponent from "../components/views/SelfDestruct/core.js";
import {
  SELF_DESTRUCT_QUERY,
  SELF_DESTRUCT_SUB,
} from "../components/views/SelfDestruct";
import {
  SELF_DESTRUCT_QUERY as CORE_QUERY,
  SELF_DESTRUCT_SUB as CORE_SUB,
} from "../components/views/SelfDestruct/core";
export default {
  title: "Cards|Command/SelfDestruct",
};
export const SelfDestruct = () => (
  <StorybookWrapper queries={[SELF_DESTRUCT_QUERY, SELF_DESTRUCT_SUB]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore queries={[CORE_QUERY, CORE_SUB]}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
