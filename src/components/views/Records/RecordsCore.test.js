import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Core, {RECORDS_CORE_SUB, RECORDS_CORE_QUERY} from "./core";

it.skip("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    queries: [RECORDS_CORE_SUB, RECORDS_CORE_QUERY],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
