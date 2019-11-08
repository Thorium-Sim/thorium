import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Core, {SELF_DESTRUCT_QUERY, SELF_DESTRUCT_SUB} from "./core.js";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    queries: [SELF_DESTRUCT_QUERY, SELF_DESTRUCT_SUB],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
