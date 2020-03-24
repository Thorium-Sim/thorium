import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Core, {JUMP_DRIVE_CORE_QUERY, JUMP_DRIVE_CORE_SUB} from "./core";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    queries: [JUMP_DRIVE_CORE_QUERY, JUMP_DRIVE_CORE_SUB],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
