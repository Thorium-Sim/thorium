import React from "react";
import {
  waitForElementToBeRemoved,
  wait,
  waitForElement,
  fireEvent,
} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Component, {
  MESSAGING_QUERY,
  MESSAGING_SUB,
  MESSAGING_TEAMS_SUB,
} from "./index";

it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    queries: [
      [MESSAGING_QUERY, [], {simulatorId: "test", station: "Test Station"}],
      [MESSAGING_SUB, [], {simulatorId: "test", station: "Test Station"}],
      MESSAGING_TEAMS_SUB,
    ],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});

it("should persist messages, even when unmounted", async () => {
  // Patch for popper
  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document,
    },
  });

  const {getByText, getByTestId, getByDisplayValue, unmount} = render(
    <Component {...baseProps} />,
    {
      queries: [
        [MESSAGING_QUERY, [], {simulatorId: "test", station: "Test Station"}],
        [MESSAGING_SUB, [], {simulatorId: "test", station: "Test Station"}],
        MESSAGING_TEAMS_SUB,
      ],
    },
  );
  await waitForElement(() => getByText("New Message"));
  await fireEvent.click(getByText("New Message"));
  await waitForElement(() => getByText("Comm"));
  await fireEvent.click(getByText("Comm"));
  await waitForElement(() => getByTestId("Messaging-Input"));
  await fireEvent.change(getByTestId("Messaging-Input"), {
    target: {value: "Hello there!"},
  });
  await waitForElement(() => getByDisplayValue("Hello there!"));
  await unmount();

  const secondElement = render(<Component {...baseProps} />, {
    queries: [
      [MESSAGING_QUERY, [], {simulatorId: "test", station: "Test Station"}],
      [MESSAGING_SUB, [], {simulatorId: "test", station: "Test Station"}],
      MESSAGING_TEAMS_SUB,
    ],
  });
  await waitForElement(() => secondElement.getByText("New Message"));
  await waitForElement(() => secondElement.getByDisplayValue("Hello there!"));
});
