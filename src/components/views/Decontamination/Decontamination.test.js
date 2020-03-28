import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Component, {DECON_QUERY, DECON_SUB} from "./index";
import {DECON_OFFSET_MUTATION} from "./program";

it.skip("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    queries: [
      DECON_QUERY,
      DECON_SUB,
      [
        DECON_OFFSET_MUTATION,
        [],
        {id: "815448b4-a1a1-434f-8028-0f3b813b0ca3", offset: 96},
      ],
    ],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
