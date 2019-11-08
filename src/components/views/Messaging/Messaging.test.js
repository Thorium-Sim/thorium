import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component, {
  MESSAGING_QUERY,
  MESSAGING_SUB,
  MESSAGING_TEAMS_SUB,
} from "./index.js";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    queries: [
      [MESSAGING_QUERY, [], {simulatorId: "test", station: "Test Station"}],
      [MESSAGING_SUB, [], {simulatorId: "test", station: "Test Station"}],
      MESSAGING_TEAMS_SUB,
    ],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
