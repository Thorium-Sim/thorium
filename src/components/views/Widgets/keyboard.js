import React from "react";
import "./keyboard.css";

const keys = [
  { name: "esc", modifier: true, escape: true, short: true },
  { name: "F1", short: true },
  { name: "F2", short: true },
  { name: "F3", short: true },
  { name: "F4", short: true },
  { name: "F5", short: true },
  { name: "F6", short: true },
  { name: "F7", short: true },
  { name: "F8", short: true },
  { name: "F9", short: true },
  { name: "F10", short: true },
  { name: "F11", short: true },
  { name: "F12", short: true },
  { name: " ", size: "2u", short: true, blank: true },
  { name: "`", shift: "~" },
  { name: "1", shift: "!" },
  { name: "2", shift: "@" },
  { name: "3", shift: "#" },
  { name: "4", shift: "$" },
  { name: "5", shift: "%" },
  { name: "6", shift: "^" },
  { name: "7", shift: "&" },
  { name: "8", shift: "*" },
  { name: "9", shift: "(" },
  { name: "0", shift: ")" },
  { name: "-", shift: "_" },
  { name: "=", shift: "+" },
  { name: "delete", shift: "delete", size: "2u", modifier: true },
  { name: "tab", shift: "tab", size: "1-5u", modifier: true },
  { name: "q", shift: "Q" },
  { name: "w", shift: "W" },
  { name: "e", shift: "E" },
  { name: "r", shift: "R" },
  { name: "t", shift: "T" },
  { name: "y", shift: "Y" },
  { name: "u", shift: "U" },
  { name: "i", shift: "I" },
  { name: "o", shift: "O" },
  { name: "p", shift: "P" },
  { name: "[", shift: "{" },
  { name: "]", shift: "}" },
  { name: "\\", shift: "|", size: "1-5u", modifier: true },
  { name: "caps", shift: "caps", size: "1-75u", modifier: true },
  { name: "a", shift: "A" },
  { name: "s", shift: "S" },
  { name: "d", shift: "D" },
  { name: "f", shift: "F" },
  { name: "g", shift: "G" },
  { name: "h", shift: "H" },
  { name: "j", shift: "J" },
  { name: "k", shift: "K" },
  { name: "l", shift: "L" },
  { name: ";", shift: ":" },
  { name: "'", shift: '"' },
  {
    name: "return",
    shift: "return",
    size: "2-25u",
    modifier: true,
    enter: true
  },
  {
    name: "lshift",
    shift: "shift",
    size: "2-25u",
    modifier: true,
    shifter: true
  },
  { name: "z", shift: "Z" },
  { name: "x", shift: "X" },
  { name: "c", shift: "C" },
  { name: "v", shift: "V" },
  { name: "b", shift: "B" },
  { name: "n", shift: "N" },
  { name: "m", shift: "M" },
  { name: ",", shift: "<" },
  { name: ".", shift: ">" },
  { name: "/", shift: "?" },
  { name: "rshift", shift: "shift", size: "2-75u", modifier: true },
  { name: "lcontrol", shift: "control", size: "1-25u", modifier: true },
  { name: "loption", shift: "option", size: "1-25u", modifier: true },
  { name: "lcommand", shift: "command", size: "1-25u", modifier: true },
  { name: "space", shift: "space", size: "7-25u" },
  { name: "rcommand", shift: "command", size: "1-25u", modifier: true },
  { name: "roption", shift: "option", size: "1-25u", modifier: true },
  { name: "rcontrol", shift: "control", size: "1-25u", modifier: true }
];

function simulateKeyPress(key, el) {
  const evt = document.createEvent("KeyboardEvent");
  var initMethod =
    typeof evt.initKeyboardEvent !== "undefined"
      ? "initKeyboardEvent"
      : "initKeyEvent";
  evt[initMethod](
    "keydown",
    true,
    true,
    window,
    0,
    0,
    0,
    0,
    0,
    key.charCodeAt(0)
  );
  const canceled = !el.dispatchEvent(evt);
  if (canceled) {
    // A handler called preventDefault
    alert("canceled");
  } else {
    // None of the handlers called preventDefault
    //alert("not canceled");
  }
}

const Key = ({
  name,
  modifier,
  escape,
  size,
  shifter,
  enter,
  shift,
  short,
  blank
}) => {
  return (
    <div
      onMouseDown={e => {
        e.stopPropagation();
        e.preventDefault();
        //simulateKeyPress(name, document.activeElement);
        document.activeElement.value += name;
      }}
      className={`key ${size ? "size-" + size : ""} ${escape ? "escape" : ""} ${
        modifier ? "modifier" : ""
      } ${enter ? "enter" : ""} ${short ? "short" : ""} ${
        blank ? "blank" : ""
      }`}
    >
      {name}
    </div>
  );
};

const Keyboard = () => {
  return (
    <div>
      <div className="keyboard">
        {keys.map(k => <Key key={k.name} {...k} />)}
      </div>
    </div>
  );
};

export default Keyboard;
