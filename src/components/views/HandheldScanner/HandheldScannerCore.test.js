import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Core, {
  HANDHELD_SCANNER_QUERY,
  HANDHELD_SCANNER_SUBSCRIPTION,
} from "./core";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    queries: [HANDHELD_SCANNER_QUERY, HANDHELD_SCANNER_SUBSCRIPTION],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
