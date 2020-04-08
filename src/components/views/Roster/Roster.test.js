import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Component, {ROSTER_QUERY, ROSTER_SUB} from "./index";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    queries: [ROSTER_QUERY, ROSTER_SUB],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
