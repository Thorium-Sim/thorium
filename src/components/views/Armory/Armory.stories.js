import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/Armory/index.js";
import CoreComponent from "components/views/Armory/core.js";
import {armoryMocks} from "mocks/cards/Armory.mock.js";

export default {
  title: "Cards|Crew/Armory",
};
export const Armory = () => (
  <StorybookWrapper mocks={armoryMocks}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={armoryMocks}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
