import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Roster/index.js";

export default {
  title: "Cards|Roster",
};
export const Roster = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
