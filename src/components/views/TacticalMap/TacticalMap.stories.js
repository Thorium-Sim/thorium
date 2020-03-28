import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/TacticalMap/index";
import TacticalMapMock from "mocks/cards/TacticalMap.mock.js";

export default {
  title: "Cards|Viewscreen/TacticalMap",
};
export const TacticalMap = () => (
  <StorybookWrapper mocks={TacticalMapMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
