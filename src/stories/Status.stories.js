import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/Status/index.js";
import StatusMock from "mocks/cards/Status.mock.js";

export default {
  title: "Cards|Command/Status",
};
export const Status = () => (
  <StorybookWrapper mocks={StatusMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
