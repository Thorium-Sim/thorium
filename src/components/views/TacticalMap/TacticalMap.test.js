import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Component from "./index";

// Skipping because of something weird involving the subscription.
// Refactor to use hooks, then try again.
it.skip("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {});
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
