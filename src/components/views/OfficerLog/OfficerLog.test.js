import React from "react";
import {waitForElementToBeRemoved} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component, {OFFICER_LOG_QUERY, OFFICER_LOG_SUB} from "./index.js";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    queries: [
      [OFFICER_LOG_QUERY, [], {clientId: "test", flightId: "test"}],
      [OFFICER_LOG_SUB, [], {clientId: "test", flightId: "test"}],
    ],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
