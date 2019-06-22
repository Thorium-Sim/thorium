import React from "react";
import useSoundEffect from "helpers/hooks/useSoundEffect";

const Keypad = ({ keydown, clear, enter }) => {
  const playEffect = useSoundEffect();
  React.useEffect(() => {
    const handleKeydown = e => {
      playEffect("buttonClick");

      if (e.target.classList.contains("no-keypad")) return;
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

    document.addEventListener("keydown", handleKeydown, false);
    return () => document.removeEventListener("keydown", handleKeydown, false);
  }, [clear, enter, keydown, playEffect]);

  const handleClick = which => {
    playEffect("buttonClick");
    if (which === "clear") return clear();
    if (which === "enter") return enter();
    return keydown(which);
  };
  return (
    <div className={`keypadButtons`}>
      <div onClick={() => handleClick(7)} className="keypad alertBack">
        7
      </div>
      <div onClick={() => handleClick(8)} className="keypad alertBack">
        8
      </div>
      <div onClick={() => handleClick(9)} className="keypad alertBack">
        9
      </div>
      <div onClick={() => handleClick(4)} className="keypad alertBack">
        4
      </div>
      <div onClick={() => handleClick(5)} className="keypad alertBack">
        5
      </div>
      <div onClick={() => handleClick(6)} className="keypad alertBack">
        6
      </div>
      <div onClick={() => handleClick(1)} className="keypad alertBack">
        1
      </div>
      <div onClick={() => handleClick(2)} className="keypad alertBack">
        2
      </div>
      <div onClick={() => handleClick(3)} className="keypad alertBack">
        3
      </div>
      <div onClick={() => handleClick(".")} className="keypad alertBack">
        .
      </div>
      <div onClick={() => handleClick(0)} className="keypad alertBack">
        0
      </div>
      <div
        onClick={() => handleClick("clear")}
        className="keypad alertBack clearButton"
      >
        C
      </div>
      <div
        onClick={() => handleClick("enter")}
        className=" btn-block alertBack enter"
      >
        Enter
      </div>
    </div>
  );
};

export default Keypad;
