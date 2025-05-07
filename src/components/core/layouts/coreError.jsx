import React, {Component} from "react";
// import * as Sentry from "@sentry/browser";
// import {Button} from "helpers/reactstrap";
class CoreError extends Component {
  state = {error: false};
  componentDidCatch(error, errorInfo) {
    this.setState({error: true});
    console.error(error);
    // Sentry.withScope(scope => {
    //   Object.keys(errorInfo).forEach(key => {
    //     scope.setExtra(key, errorInfo[key]);
    //   });
    //   Sentry.captureException(error);
    // });
  }
  render() {
    if (this.state.error)
      return (
        <div>
          An error has occured. Please refer to the developer console for error
          details.{" "}
          {/* <Button size="sm" onClick={() => Sentry.showReportDialog()} href="#">
            Report feedback
          </Button> */}
        </div>
      );
    return (
      <React.Suspense fallback={null}>{this.props.children}</React.Suspense>
    );
  }
}
export default CoreError;
