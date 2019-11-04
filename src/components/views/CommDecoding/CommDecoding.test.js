import React from "react";
import {waitForElementToBeRemoved} from '@testing-library/react';
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component from "./index.js";
import CommDecodingMock from "mocks/cards/CommDecoding.mock.js";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    
    mocks: CommDecodingMock
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."))
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
