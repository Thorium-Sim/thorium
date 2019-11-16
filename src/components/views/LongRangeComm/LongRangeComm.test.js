import React from "react";
import {
  waitForElementToBeRemoved,
  wait,
  waitForElement,
  fireEvent,
} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component from "./index.js";
import CommDecodingMock from "mocks/cards/CommDecoding.mock.js";
import Composer from "./Composer";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    mocks: CommDecodingMock,
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});

it("Should persist after unmounting", async () => {
  const {getByText, getByTestId, unmount} = render(<Composer {...baseProps} />);
  await waitForElement(() => getByText("To:"));
  await waitForElement(() => getByTestId("composer-to"));
  await fireEvent.change(getByTestId("composer-to"), {
    target: {value: "Test Location"},
  });
  await fireEvent.change(getByTestId("composer-message"), {
    target: {value: "Hello there!"},
  });
  await unmount();

  const secondRender = render(<Composer {...baseProps} />);

  await waitForElement(() => secondRender.getByText("To:"));
  expect(getByTestId("composer-to").value).toEqual("Test Location");
  expect(getByTestId("composer-message").value).toEqual("Hello there!");
});
