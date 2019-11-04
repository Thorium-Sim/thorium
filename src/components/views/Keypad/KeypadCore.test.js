import React from "react";
import {waitForElementToBeRemoved} from '@testing-library/react';
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Core, {KEYPAD_QUERY,KEYPAD_SUB} from "./core.js";


it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    queries: [KEYPAD_QUERY, KEYPAD_SUB],
    
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."))
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
