import React from "react";
import {cleanup, fireEvent, render} from "@testing-library/react";
import {DndContext} from "react-dnd";
import CoreComponents from "./CoreComponents";

const managers = [];

vi.mock("components/views", () => ({
  Cores: {
    TestCore: () => {
      managers.push(React.useContext(DndContext).dragDropManager);
      return <div>Test core</div>;
    },
  },
}));
vi.mock("./layouts", async () => {
  const {default: Dynamic} = await import("./layouts/dynamic");
  return {
    Dynamic,
    // Match Next's nested Dynamic placement without loading unrelated panels.
    Next: props => (
      <div>
        <Dynamic {...props} />
      </div>
    ),
    Other: () => <div>Other layout</div>,
  };
});
vi.mock("./menubar", () => ({
  default: ({layout, pickLayout}) => (
    <select aria-label="Layout" value={layout} onChange={pickLayout}>
      <option>Dynamic</option>
      <option>Next</option>
      <option>Other</option>
    </select>
  ),
}));
vi.mock("./hotkey", () => ({default: () => null}));
vi.mock("./sidebar", () => ({default: () => null}));
vi.mock("../generic/Alerts", () => ({default: () => null}));

afterEach(() => {
  cleanup();
  localStorage.clear();
  managers.length = 0;
});

it("keeps one drag backend across repeated core layout switches", () => {
  localStorage.setItem("thorium_coreLayout", "Dynamic");
  localStorage.setItem("thorium_coreMosaic", JSON.stringify("TestCore"));
  const {getByLabelText, getByText} = render(
    <CoreComponents simulators={[{id: "simulator"}]} clients={[]} />,
  );
  expect(getByText("Test core")).toBeTruthy();
  const originalManager = managers[0];
  expect(originalManager).toBeTruthy();

  for (const layout of ["Next", "Dynamic", "Other", "Next", "Dynamic"]) {
    fireEvent.change(getByLabelText("Layout"), {target: {value: layout}});
    expect(
      getByText(layout === "Other" ? "Other layout" : "Test core"),
    ).toBeTruthy();
  }
  expect(managers.length).toBeGreaterThan(1);
  expect(managers.every(manager => manager === originalManager)).toBe(true);
});
