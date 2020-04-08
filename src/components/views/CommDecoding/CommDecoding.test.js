import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Component from "./index";
import CommDecodingMock from "mocks/cards/CommDecoding.mock";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    mocks: CommDecodingMock,
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
