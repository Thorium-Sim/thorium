import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/Offline/index.js";

export default {
  title: "Cards|Crew/Offline",
};
export const Offline = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
