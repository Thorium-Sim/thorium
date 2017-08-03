import React from "react";

export default props => {
  return (
    <div className="keypadButtons card">
      <div onClick={props.keydown.bind(this, 7)} className="keypad alertBack">
        7
      </div>
      <div onClick={props.keydown.bind(this, 8)} className="keypad alertBack">
        8
      </div>
      <div onClick={props.keydown.bind(this, 9)} className="keypad alertBack">
        9
      </div>
      <div onClick={props.keydown.bind(this, 4)} className="keypad alertBack">
        4
      </div>
      <div onClick={props.keydown.bind(this, 5)} className="keypad alertBack">
        5
      </div>
      <div onClick={props.keydown.bind(this, 6)} className="keypad alertBack">
        6
      </div>
      <div onClick={props.keydown.bind(this, 1)} className="keypad alertBack">
        1
      </div>
      <div onClick={props.keydown.bind(this, 2)} className="keypad alertBack">
        2
      </div>
      <div onClick={props.keydown.bind(this, 3)} className="keypad alertBack">
        3
      </div>
      <div onClick={props.keydown.bind(this, ".")} className="keypad alertBack">
        .
      </div>
      <div onClick={props.keydown.bind(this, 0)} className="keypad alertBack">
        0
      </div>
      <div onClick={props.clear} className="keypad alertBack clearButton">
        C
      </div>
      <div onClick={props.enter} className=" btn-block alertBack enter">
        Enter
      </div>
    </div>
  );
};