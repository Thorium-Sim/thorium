import { Component } from "react";
import { findDOMNode } from "react-dom";
const TweenMax = window.TweenMax;

export default class Transitioner extends Component {
  componentWillEnter(callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(
      el,
      0.5,
      { z: 100, rotationY: 0, opacity: 0, transformPerspective: 200 },
      {
        z: 0,
        rotationY: 0,
        opacity: 1,
        transformPerspective: 200,
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
}
