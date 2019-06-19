import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import ErrorBoundary from "helpers/errorBoundary";
import { Button } from "helpers/reactstrap";

const TweenMax = window.TweenMax;

export default class CardHolder extends Component {
  componentWillEnter(callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(
      el,
      0.5,
      { opacity: 0 },
      {
        opacity: 1,
        onComplete: callback
      }
    );
  }

  componentWillLeave(callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(
      el,
      0.5,
      { opacity: 1 },
      {
        opacity: 0,
        onComplete: callback
      }
    );
  }
  render() {
    return (
      <div
        className="cardContainer"
        style={{ width: "100%", position: "absolute", alignSelf: "center" }}
      >
        <ErrorBoundary
          render={
            <div className={"card-error"}>
              <p className="offline-title">Station Error</p>
              <p className="offline-message" style={{ fontSize: "40px" }}>
                Your station has experienced an error. A diagnostic must be
                performed to restore this station to functionality. If you
                continue to see this screen after performing the diagnostic,
                please contact a computer specialist.
              </p>
              <Button
                block
                color="primary"
                size="lg"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Perform Diagnostic
              </Button>
            </div>
          }
        >
          <this.props.component {...this.props} />
        </ErrorBoundary>
      </div>
    );
  }
}
