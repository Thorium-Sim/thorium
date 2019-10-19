import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/AdminAssets/index.js";

export default {
  title: "Cards|AdminAssets",
};
export const AdminAssets = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
