import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/CommReview/index.js";

export default {
  title: "Cards|CommReview",
};
export const CommReview = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
