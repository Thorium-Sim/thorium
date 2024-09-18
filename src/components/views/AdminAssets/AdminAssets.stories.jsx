import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/AdminAssets/index";

export default {
  title: "Cards|Core/AdminAssets",
};
export const AdminAssets = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
