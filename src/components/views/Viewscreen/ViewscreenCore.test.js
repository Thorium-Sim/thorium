import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Core, {VIEWSCREEN_CORE_QUERY, VIEWSCREEN_CORE_SUB} from "./core.js";
import {assetsMocks} from "mocks/cards/Assets.mock";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    queries: [VIEWSCREEN_CORE_QUERY, VIEWSCREEN_CORE_SUB],
    mocks: [...assetsMocks],
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
