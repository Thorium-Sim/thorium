import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";
import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/LongRangeComm/index.js";
import CommDecodingMock from "mocks/cards/CommDecoding.mock.js";

export default {
  title: "Cards|Communications/LongRangeComm",
};
export const LongRangeComm = () => (
  <StorybookWrapper mocks={CommDecodingMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
