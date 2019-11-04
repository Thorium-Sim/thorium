import React from "react";
import {waitForElementToBeRemoved} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component, {
  DAMAGE_REPORT_QUERY,
  DAMAGE_SYSTEMS_SUB,
  DAMAGE_TASK_REPORT_SUB,
} from "./index.js";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    queries: [
      [DAMAGE_REPORT_QUERY, [], {simulatorId: "test", which: "default"}],
      [DAMAGE_SYSTEMS_SUB, [], {simulatorId: "test", which: "default"}],
      [DAMAGE_TASK_REPORT_SUB, [], {simulatorId: "test", which: "default"}],
    ],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
