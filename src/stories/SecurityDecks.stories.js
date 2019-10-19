import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/SecurityDecks/index.js";
import CoreComponent from "../components/views/SecurityDecks/core.js";

export default {
  title: "Cards|SecurityDecks",
};
export const SecurityDecks = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
