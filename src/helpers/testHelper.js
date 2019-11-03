import React from "react";
import {render as rtlRender} from "@testing-library/react";
import Provider from "../stories/helpers/mockProvider";

window.thorium = window.thorium || {
  sendMessage: args => {},
  clockSync: 0,
};

export default function render(component, {mocks, queries} = {}) {
  const Comp = (
    <React.Suspense fallback={"Loading..."}>
      <Provider mocks={mocks} queries={queries} children={component} />
    </React.Suspense>
  );
  return rtlRender(Comp);
}
