import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/CommReview/index.js";

export default {
  title: "Cards|CommReview",
};
export const CommReview = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
