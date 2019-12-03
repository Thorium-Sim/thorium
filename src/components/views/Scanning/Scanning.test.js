import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component, {SENSOR_QUERY, SENSOR_SUB} from "./index.js";

it("should render", async () => {
  const {container, getByText} = render(
    <Component domain="internal" {...baseProps} />,
    {
      queries: [
        [SENSOR_QUERY, [], {simulatorId: "test", domain: "internal"}],
        [SENSOR_SUB, [], {simulatorId: "test", domain: "internal"}],
      ],
    },
  );
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();

  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
