import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/ProbeConstruction/index.js";
import ProbeConstructionMock from "../mocks/cards/ProbeConstruction.mock";
export default {
  title: "Cards|Sensors/ProbeConstruction",
};
export const ProbeConstruction = () => (
  <StorybookWrapper mocks={ProbeConstructionMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
