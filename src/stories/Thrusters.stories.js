import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Thrusters/index.js";
import CoreComponent from "../components/views/Thrusters/core.js";
import ThrustersMock from "mocks/cards/Thrusters.mock.js";

export default {
  title: "Cards|Navigation/Thrusters",
};
export const Thrusters = () => (
  <StorybookWrapper mocks={ThrustersMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={ThrustersMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
