import React from "react";

import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";

import CoreComponent from "../components/views/Clients/core.js";
import ClientsMock from "mocks/cards/Clients.mock.js";

export default {
  title: "Cards|Clients",
};

export const Core = () => (
  <StorybookWrapperCore mocks={ClientsMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
