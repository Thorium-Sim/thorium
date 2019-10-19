import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/Battle/index.js";

export default {
  title: "Cards|Battle",
};
export const Battle = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
