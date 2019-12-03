import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Core, {SHUTTLE_CORE_QUERY, SHUTTLE_CORE_SUB} from "./core.js";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    queries: [SHUTTLE_CORE_QUERY, SHUTTLE_CORE_SUB],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
