import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component, {
  CRM_MOVEMENT_QUERY,
  CRM_MOVEMENT_SUBSCRIPTION,
} from "./index.js";
import {
  CRM_FIGHTER_DATA_QUERY,
  CRM_FIGHTER_DATA_SUB,
} from "components/views/CrmFighter/fighterData.js";

it.skip("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    queries: [
      CRM_MOVEMENT_QUERY,
      CRM_MOVEMENT_SUBSCRIPTION,
      [CRM_FIGHTER_DATA_QUERY, [], {clientId: "test", simulatorId: "test"}],
      [CRM_FIGHTER_DATA_SUB, [], {clientId: "test", simulatorId: "test"}],
    ],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
