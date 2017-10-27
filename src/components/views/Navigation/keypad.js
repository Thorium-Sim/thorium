import React from "react";

export default ({ keydown, clear, enter, margin }) => {
  return (
    <div className={`keypadButtons card ${!margin ? "" : "margin"}`}>
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
};
