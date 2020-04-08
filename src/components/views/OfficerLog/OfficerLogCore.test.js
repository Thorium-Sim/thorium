import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Core, {OFFICER_LOG_CORE_QUERY, OFFICER_LOG_CORE_SUB} from "./core";

// Skipping because of a weird subscription/query issue.
it.skip("should render", async () => {
  const {container, getByText} = render(
    <Core {...baseProps} flightId="test" />,
    {
      queries: [
        [OFFICER_LOG_CORE_QUERY, [], {clientId: "test", flightId: "test"}],
        [OFFICER_LOG_CORE_SUB, [], {clientId: "test", flightId: "test"}],
      ],
    },
  );
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
