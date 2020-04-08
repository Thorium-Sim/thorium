import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Core from "./core";
import CrewMock from "mocks/cards/Crew.mock";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    mocks: CrewMock,
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
