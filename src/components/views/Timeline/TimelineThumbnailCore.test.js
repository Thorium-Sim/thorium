import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component from "./thumbnailData.js";
import TimelineMock from "mocks/cards/Timeline.mock";

it("should render", async () => {
  const {container, getByText, debug} = render(<Component {...baseProps} />, {
    mocks: TimelineMock,
  });
  debug();
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  console.log(container.innerHTML);
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
