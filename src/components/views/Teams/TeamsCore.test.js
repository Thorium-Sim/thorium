import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Core from "./core.js";
import TeamsMock from "mocks/cards/Teams.mock";

// Skipping because the union type on location is complicated.
// Either follow the instructions here https://www.apollographql.com/docs/react/data/fragments/#fragments-on-unions-and-interfaces
// or refactor to not be a union type
it.skip("should render", async () => {
  const {container, getByText} = render(
    <Core {...baseProps} teamType="security" />,
    {mocks: TeamsMock},
  );
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
