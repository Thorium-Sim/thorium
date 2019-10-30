import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Railgun/index.js";
import CoreComponent from "../components/views/Railgun/core.js";
import RailgunMock from "mocks/cards/Railgun.mock.js";

export default {
  title: "Cards|Weapons/Railgun",
};
export const Railgun = () => (
  <StorybookWrapper mocks={RailgunMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={RailgunMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
