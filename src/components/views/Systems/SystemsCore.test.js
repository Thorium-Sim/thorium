import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Core, {
  DAMAGE_REACTOR_CORE_SUB,
  DAMAGE_SYSTEMS_CORE_SUB,
  DAMAGE_SYSTEMS_CORE_QUERY,
} from "./../components/views/DamageControl/core.js";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    queries: [
      DAMAGE_REACTOR_CORE_SUB,
      DAMAGE_SYSTEMS_CORE_SUB,
      DAMAGE_SYSTEMS_CORE_QUERY,
    ],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
