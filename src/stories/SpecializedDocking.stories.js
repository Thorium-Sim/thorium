import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/SpecializedDocking/index.js";
import CoreComponent from "../components/views/SpecializedDocking/core.js";
import SpecializedDockingMock from "mocks/cards/SpecializedDocking.mock.js";

export default {
  title: "Cards|Operations/SpecializedDocking",
};
export const SpecializedDocking = () => (
  <StorybookWrapper mocks={SpecializedDockingMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={SpecializedDockingMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
