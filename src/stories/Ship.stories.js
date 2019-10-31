import React from "react";

import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";

import CoreComponent from "../components/views/Ship/core.js";
import ShipCoreMock from "mocks/cards/ShipCore.mock.js";

export default {
  title: "Cards|Core/Ship",
};

export const Core = () => (
  <StorybookWrapperCore mocks={ShipCoreMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
