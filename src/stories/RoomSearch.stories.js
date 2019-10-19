import React from "react";
import StorybookWrapper from "./storybookWrapper.js";
import baseProps from "./baseProps.js";
import Component from "../components/views/RoomSearch/index.js";

export default {
  title: "Cards|RoomSearch",
};
export const RoomSearch = () => (
  <StorybookWrapper>
    <Component {...baseProps} />
  </StorybookWrapper>
);
