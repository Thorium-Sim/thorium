import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { Button } from "reactstrap";
import { TweenMax } from "gsap";
import ErrorBoundary from "../../helpers/errorBoundary";

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
      { z: 0, rotationY: 0, opacity: 1, transformPerspective: 200 },
      {
        z: -100,
        rotationY: 0,
        opacity: 0,
        transformPerspective: 200,
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
