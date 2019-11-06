import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/SubspaceField/index.js";
import CoreComponent from "../components/views/SubspaceField/core.js";
import SubspaceFieldMock from "../mocks/cards/SubspaceField.mock";
export default {
  title: "Cards|Operations/SubspaceField",
};
export const SubspaceField = () => (
  <StorybookWrapper mocks={SubspaceFieldMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={SubspaceFieldMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
