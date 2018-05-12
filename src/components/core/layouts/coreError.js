import React, { Component } from "react";

class CoreError extends Component {
  state = { error: false };
  componentDidCatch() {
    this.setState({ error: true });
  }
  render() {
    if (this.state.error)
      return (
        <div>
          An error has occured. Please refer to the developer console for error
          details.
        </div>
      );
    return this.props.children;
  }
}
export default CoreError;
