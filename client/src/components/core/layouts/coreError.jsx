import React, {Component} from "react";

class CoreError extends Component {
  state = {error: false};
  componentDidCatch(error, errorInfo) {
    this.setState({error: true});
    console.error(error);
  }
  render() {
    if (this.state.error)
      return (
        <div>
          An error has occured. Please refer to the developer console for error
          details.{" "}
        </div>
      );
    return (
      <React.Suspense fallback={null}>{this.props.children}</React.Suspense>
    );
  }
}
export default CoreError;
