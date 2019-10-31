import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";
import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/SecurityDecks/index.js";
import CoreComponent from "../components/views/SecurityDecks/core.js";
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
