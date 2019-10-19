import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/MedicalRoster/index.js";

export default {
  title: "Cards|MedicalRoster",
};
export const MedicalRoster = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
