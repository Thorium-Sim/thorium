import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/CargoControl/index.js";
import CoreComponent from "components/views/CargoControl/core.js";
import CargoControlMock from "mocks/cards/CargoControl.mock.js";

export default {
  title: "Cards|Operations/CargoControl",
};
export const CargoControl = () => (
  <StorybookWrapper mocks={CargoControlMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={CargoControlMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
