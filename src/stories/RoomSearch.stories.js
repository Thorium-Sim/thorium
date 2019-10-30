import React from "react";
import StorybookWrapper from "./helpers/storybookWrapper.js";

import baseProps from "./helpers/baseProps.js";
import Component from "../components/views/RoomSearch/index.js";
import RoomSearchMocks from "mocks/cards/RoomSearch.mocks.js";

export default {
  title: "Cards|Core/RoomSearch",
};
export const RoomSearch = () => (
  <StorybookWrapper mocks={RoomSearchMocks}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
