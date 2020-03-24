import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Core, {NAVIGATION_CORE_QUERY, NAVIGATION_CORE_SUB} from "./core";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    queries: [NAVIGATION_CORE_QUERY, NAVIGATION_CORE_SUB],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
