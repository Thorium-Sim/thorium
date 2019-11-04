import React from "react";
import {waitForElementToBeRemoved} from '@testing-library/react';
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Core from "./core.js";
import SecurityDecksMock from "mocks/cards/SecurityDecks.mock.js";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    
    mocks: SecurityDecksMock
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."))
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
