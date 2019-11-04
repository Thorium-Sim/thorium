import React from "react";
import {waitForElementToBeRemoved} from '@testing-library/react';
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component, {REACTOR_SUB,REACTOR_QUERY,SYSTEMS_SUB,DOCKING_SUB} from "./index.js";


it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    queries: [REACTOR_SUB, REACTOR_QUERY, SYSTEMS_SUB, DOCKING_SUB],
    
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."))
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
