import React, { Component } from "react";
import letters from "./letters";

function randomFromList(list) {
  if (!list) return;
  const length = list.length;
  const index = Math.floor(Math.random() * length);
  return list[index];
}

function makeLine() {
  return (
    Array(20)
      .fill(0)
      .map(() => randomFromList(letters))
      .join("") + " "
  );
}
class Soviet extends Component {
  counter = 0;
  state = {
    show: true,
    lettersRight: Array(15)
      .fill(0)
      .map(() => makeLine())
      .join(""),
    lettersLeft: Array(15)
      .fill(0)
      .map(() => makeLine())
      .join("")
  };
  componentDidMount() {
    this.loop();
    this.letters();
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
    cancelAnimationFrame(this.frame);
  }
  loop = () => {
    this.setState({
      show: !this.state.show
    });
    this.timeout = setTimeout(this.loop, this.state.show ? 1200 : 200);
  };
  letters = () => {
    const newLeft = this.state.lettersLeft.substring(27);
    const newRight = this.state.lettersRight.substring(27);
    this.setState({
      lettersLeft: newLeft + makeLine(),
      lettersRight: newRight + makeLine()
    });
    this.frame = requestAnimationFrame(this.letters);
  };
  render() {
    const { show, lettersLeft, lettersRight } = this.state;
    return (
      <div className="card-cover soviet">
        <div className="top-block">
          <div className="text-block" style={{ textAlign: "right" }}>
            {lettersLeft}
          </div>
          <div className="image-block">
            <img
              src={require("./soviet.svg")}
              alt="System Compromised"
              draggable="false"
            />
          </div>
          <div className="text-block">{lettersRight}</div>
        </div>
        <h1 style={{ opacity: show ? 1 : 0 }}>Скомпрометирована Система</h1>
      </div>
    );
  }
}
export default Soviet;
