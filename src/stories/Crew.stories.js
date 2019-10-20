import React from "react";

import StorybookWrapperCore from "./helpers/storybookWrapperCore.js";
import baseProps from "./helpers/baseProps.js";

import CoreComponent from "../components/views/Crew/core.js";
import CrewMock from "mocks/cards/Crew.mock.js";

export default {
  title: "Cards|Crew/Crew",
};

export const Core = () => (
  <StorybookWrapperCore mocks={CrewMock}>
    <CoreComponent {...baseProps} />
  </StorybookWrapperCore>
);
