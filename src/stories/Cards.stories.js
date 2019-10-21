import React from "react";

import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";

import CoreComponent from "../components/views/Cards/core.js";
import cardsMock from "../mocks/cards/Cards.mock.js";

export default {
  title: "Cards|Core/Cards",
};
export const Core = () => (
  <StorybookWrapperCore mocks={cardsMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
