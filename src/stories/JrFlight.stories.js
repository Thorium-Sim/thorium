import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/JrFlight/index.js";

export default {
  title: "Cards|JrFlight",
};
export const JrFlight = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
