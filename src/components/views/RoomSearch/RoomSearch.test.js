import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Component from "./index";
import RoomSearchMocks from "mocks/cards/RoomSearch.mocks";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    mocks: RoomSearchMocks,
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
