import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Core from "./core";
import SurveyFormMock from "mocks/cards/SurveyForm.mock";

it("should render", async () => {
  const {container, getByText} = render(<Core {...baseProps} />, {
    mocks: SurveyFormMock,
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
