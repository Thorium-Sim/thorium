import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Core, {SICKBAY_CORE_QUERY, SICKBAY_CORE_SUB} from "./core";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    queries: [SICKBAY_CORE_QUERY, SICKBAY_CORE_SUB],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
