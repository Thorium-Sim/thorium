import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";

import CoreComponent from "../components/views/Clients/core.js";

export default {
  title: "Cards|Clients",
};

export const Core = () => (
  <StorybookWrapper>
    <CoreComponent {...baseProps} />
  </StorybookWrapper>
);
