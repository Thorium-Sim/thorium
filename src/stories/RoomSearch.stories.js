import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/RoomSearch/index.js";

export default {
  title: "Cards|RoomSearch",
};
export const RoomSearch = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
