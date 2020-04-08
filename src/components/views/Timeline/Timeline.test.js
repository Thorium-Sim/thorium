import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Component from "./index";
import TimelineMock from "mocks/cards/Timeline.mock";

it.skip("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    mocks: TimelineMock,
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
