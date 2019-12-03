import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/Railgun/index.js";
import RailgunLoading from "components/views/Railgun/loadingCard.js";
import CoreComponent from "components/views/Railgun/core.js";
import RailgunMock from "mocks/cards/Railgun.mock.js";

export default {
  title: "Cards|Weapons/Railgun",
};
export const Railgun = () => (
  <StorybookWrapper mocks={RailgunMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Loading = () => (
  <StorybookWrapper mocks={RailgunMock}>
    <RailgunLoading {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={RailgunMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
