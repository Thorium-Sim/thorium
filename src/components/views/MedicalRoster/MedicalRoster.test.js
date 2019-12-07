import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component, {
  MEDICAL_ROSTER_CREW_SUB,
  MEDICAL_ROSTER_QUERY,
  MEDICAL_ROSTER_SUB,
} from "./index.js";

it.skip(
  "should render",
  async () => {
    const {container, getByText} = render(<Component {...baseProps} />, {
      queries: [
        MEDICAL_ROSTER_CREW_SUB,
        MEDICAL_ROSTER_QUERY,
        MEDICAL_ROSTER_SUB,
      ],
    });
    await waitForElementToBeRemoved(() => getByText("Loading..."));
    await wait();
    expect(container.innerHTML).toBeTruthy();
    expect(container.innerHTML).not.toBe("Error");
  },
  10 * 1000,
);
