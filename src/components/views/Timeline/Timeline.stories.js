import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/Timeline/index.js";
import TimelineMock from "mocks/cards/Timeline.mock.js";

export default {
  title: "Cards|Core/Timeline",
};
export const Timeline = () => (
  <StorybookWrapper mocks={TimelineMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
