import React from "react";
import {render as rtlRender} from "@testing-library/react";
import Provider from "../stories/helpers/mockProvider";

window.thorium = window.thorium || {
  sendMessage: args => {},
  clockSync: 0,
};

class ErrorBoundary extends React.Component {
  state = {};
  componentDidCatch(error) {
    this.setState({
      error,
    });
    console.error(error);
  }
  render() {
    if (this.state.error) return "Error";
    return this.props.children;
  }
}
export default function render(component, {mocks, queries} = {}) {
  const Comp = (
    <ErrorBoundary>
      <React.Suspense fallback={"Loading..."}>
        <Provider mocks={mocks} queries={queries} children={component} />
      </React.Suspense>
    </ErrorBoundary>
  );
  return rtlRender(Comp);
}
