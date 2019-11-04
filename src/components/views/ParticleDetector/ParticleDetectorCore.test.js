import React from "react";
import {waitForElementToBeRemoved} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Core, {
  PARTICLE_CORE_QUERY,
  PARTICLE_CONTACTS_CORE_SUB,
} from "./particleDetectorCore";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    queries: [PARTICLE_CORE_QUERY, PARTICLE_CONTACTS_CORE_SUB],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
