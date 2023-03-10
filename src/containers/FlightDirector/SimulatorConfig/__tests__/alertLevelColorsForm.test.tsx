import React from "react";
import AlertLevelColorsForm from "../config/Simulator/alertLevelColorsForm";
import mockSimulator from "mocks/data/simulators";
import {render} from "@testing-library/react";
import {Simulator} from "generated/graphql";

describe("AlertLevelColorsForm", () => {
  it("renders without errors with default props", () => {
    const {getByRole} = render(
      <AlertLevelColorsForm targetSimulatorID={"Bogus-Simulator-Id"} />,
    );

    expect(getByRole("heading")).toBeInTheDocument();
  });
});
