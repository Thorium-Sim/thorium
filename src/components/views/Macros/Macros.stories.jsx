import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/Macros/index.js";
import {MacroConfigQuery} from "containers/FlightDirector/MissionConfig/EventPicker.js";

export default {
  title: "Cards|Core/Macros",
};
export const Macros = () => (
  <StorybookWrapper queries={[MacroConfigQuery]}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
