import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Component from "./index";
import ThrustersMock from "mocks/cards/Thrusters.mock";

it("should render", async () => {
  navigator.getGamepads = () => [];
  const {container, getByText} = render(<Component {...baseProps} />, {
    mocks: ThrustersMock,
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
