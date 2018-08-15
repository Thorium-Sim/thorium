import React, { Component } from "react";
import { Cores } from "../views";
import categories from "./categories";
import { titleCase } from "change-case";
const fkeys = categories.reduce((prev, next, i) => {
  return Object.assign({}, prev, { [i + 112]: next.name });
}, {});

export default class Hotkey extends Component {
  state = {
    showing: false
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("keyup", this.handleKeyup);
  }
  handleKeydown = e => {
    const comp = fkeys[e.which];
    if (!comp) return;
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showing: comp });
  };
  handleKeyup = e => {
    const comp = fkeys[e.which];
    if (!comp) return;
    e.preventDefault();
    e.stopPropagation();
    if (!this.currentShowing) {
      this.currentShowing = this.state.showing;
      setTimeout(() => {
        this.currentShowing = null;
      }, 200);
      this.setState({ showing: null });
    }
  };
  render() {
    const { showing } = this.state;
    return (
      <div className={`hotkey-core core ${showing ? "showing" : ""}`}>
        {showing && (
          <div
            className="hotkey-core-cores"
            style={categories.find(c => c.name === showing).style}
          >
            {categories.find(c => c.name === showing).components.map(c => {
              const Comp = Cores[c];
              return (
                <div className="hotkey-core-comp" style={{ gridArea: c }}>
                  <p>{titleCase(c)}</p>
                  <Comp {...this.props} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
