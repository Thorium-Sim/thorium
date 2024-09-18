import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/SecurityDecks/index.js";
import CoreComponent from "components/views/SecurityDecks/core.js";
import SecurityDecksMock from "mocks/cards/SecurityDecks.mock.js";

export default {
  title: "Cards|Security/SecurityDecks",
};
export const SecurityDecks = () => (
  <StorybookWrapper mocks={SecurityDecksMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapperCore mocks={SecurityDecksMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
