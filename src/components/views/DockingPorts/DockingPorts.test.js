import React from "react";
import {waitForElementToBeRemoved} from '@testing-library/react';
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Component, {DOCKING_PORT_QUERY,DOCKING_PORT_SUB} from "./index.js";


it("should render", async () => {
  const {container, getByText} = render(<Component {...baseProps} />, {
    queries: [DOCKING_PORT_QUERY, DOCKING_PORT_SUB],
    
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."))
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
