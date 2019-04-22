import React, { Component } from "react";

export default class Keypad extends Component {
  handleKeydown = e => {
    if (e.target.classList.contains("no-keypad")) return;
    const { keydown, clear, enter } = this.props;
    if (e.which === 8) {
      //Delete key
      clear();
    }
    if (e.which === 13 || e.which === 9) {
      //Enter key
      enter();
    }
    if (!isNaN(parseInt(e.key, 10)) || e.key === ".") {
      keydown(e.key);
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown, false);
  }
  render() {
    const { keydown, clear, enter } = this.props;
    return (
      <div className={`keypadButtons`}>
        <div onClick={() => keydown(7)} className="keypad alertBack">
          7
        </div>
        <div onClick={() => keydown(8)} className="keypad alertBack">
          8
        </div>
        <div onClick={() => keydown(9)} className="keypad alertBack">
          9
        </div>
        <div onClick={() => keydown(4)} className="keypad alertBack">
          4
        </div>
        <div onClick={() => keydown(5)} className="keypad alertBack">
          5
        </div>
        <div onClick={() => keydown(6)} className="keypad alertBack">
          6
        </div>
        <div onClick={() => keydown(1)} className="keypad alertBack">
          1
        </div>
        <div onClick={() => keydown(2)} className="keypad alertBack">
          2
        </div>
        <div onClick={() => keydown(3)} className="keypad alertBack">
          3
        </div>
        <div onClick={() => keydown(".")} className="keypad alertBack">
          .
        </div>
        <div onClick={() => keydown(0)} className="keypad alertBack">
          0
        </div>
        <div onClick={clear} className="keypad alertBack clearButton">
          C
        </div>
        <div onClick={enter} className=" btn-block alertBack enter">
          Enter
        </div>
      </div>
    );
  }
}
