import React from "react";
import StorybookWrapper from "stories/helpers/storybookWrapper.js";

import baseProps from "stories/helpers/baseProps.js";
import Component from "components/views/Battle/index.js";
import BattleMock from "mocks/cards/Battle.mock.js";

export default {
  title: "Cards|Weapons/Battle",
};
export const Battle = () => (
  <StorybookWrapper mocks={BattleMock}>
    <Component {...baseProps} />
  </StorybookWrapper>
);
