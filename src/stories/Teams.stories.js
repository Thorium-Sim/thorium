import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Teams/index.js";
import CoreComponent from "../components/views/Teams/core.js";
import TeamsMock from "mocks/cards/Teams.mock.js";

export default {
  title: "Cards|Security/Teams",
};
export const Teams = () => (
  <StorybookWrapper mocks={TeamsMock}>
    <Component {...baseProps} teamType="security" />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={TeamsMock}>
    <CoreComponent {...baseProps} teamType="security" />
  </StorybookWrapperCore>
);
