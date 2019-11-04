import React from "react";
import {waitForElementToBeRemoved} from '@testing-library/react';
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps.js";
import Core, {RECORDS_CORE_SUB,RECORDS_CORE_QUERY} from "./core.js";


it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    queries: [RECORDS_CORE_SUB, RECORDS_CORE_QUERY],
    
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."))
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
