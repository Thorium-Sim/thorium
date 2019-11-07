import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component from "./index.js";
import ThrustersMock from "mocks/cards/Thrusters.mock";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    mocks: ThrustersMock,
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
