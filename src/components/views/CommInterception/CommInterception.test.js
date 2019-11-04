import React from "react";
import {waitForElementToBeRemoved} from '@testing-library/react';
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component from "./index.js";
import CommInterceptionMock from "mocks/cards/CommInterception.mock.js";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    
    mocks: CommInterceptionMock
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."))
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
