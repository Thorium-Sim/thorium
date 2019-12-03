import React from "react";

import StorybookWrapperCore from "stories/helpers/storybookWrapperCore.js";
import baseProps from "stories/helpers/baseProps.js";

import CoreComponent from "components/views/Clients/core.js";
import ClientsMock from "mocks/cards/Clients.mock.js";

export default {
  title: "Cards|Core/Clients",
};

export const Core = () => (
  <StorybookWrapperCore mocks={ClientsMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
