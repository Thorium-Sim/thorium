import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/CoolantControl/index.js";

export default {
  title: "Cards|CoolantControl",
};
export const CoolantControl = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
