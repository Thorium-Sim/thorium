import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component, {
  COMM_REVIEW_QUERY,
  COMM_REVIEW_SUB,
} from "../components/views/CommReview/index.js";

export default {
  title: "Cards|Communications/CommReview",
};
export const CommReview = () => {
  return (
    <StorybookWrapper queries={[[COMM_REVIEW_QUERY], [COMM_REVIEW_SUB]]}>
      <Component {...baseProps} />
    </StorybookWrapper>
  );
};
