import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Core from "./core.js";
import CargoControlMock from "mocks/cards/CargoControl.mock.js";

it.skip("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    mocks: CargoControlMock,
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
