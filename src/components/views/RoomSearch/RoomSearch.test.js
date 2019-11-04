import React from "react";
import {waitForElementToBeRemoved} from '@testing-library/react';
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component from "./index.js";
import RoomSearchMocks from "mocks/cards/RoomSearch.mocks.js";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    
    mocks: RoomSearchMocks
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."))
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
