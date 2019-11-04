import React from "react";
import {waitForElementToBeRemoved} from '@testing-library/react';
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Core from "./core.js";
import ClientsMock from "mocks/cards/Clients.mock.js";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    
    mocks: ClientsMock
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."))
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
