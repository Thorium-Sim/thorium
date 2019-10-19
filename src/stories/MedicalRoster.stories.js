import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/MedicalRoster/index.js";

export default {
  title: "Cards|MedicalRoster",
};
export const MedicalRoster = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
