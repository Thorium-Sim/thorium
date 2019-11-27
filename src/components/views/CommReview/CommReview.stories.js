import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component, {
  COMM_REVIEW_QUERY,
  COMM_REVIEW_SUB,
} from "components/views/CommReview/index.js";

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
