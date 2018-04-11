import React, { Component } from "react";
import "./keyboard.css";

export const keys = [
  { name: "esc", char: "", modifier: true, escape: true, short: true },
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
  { name: "`", char: "`", shift: "~" },
  { name: "1", char: "1", shift: "!" },
  { name: "2", char: "2", shift: "@" },
  { name: "3", char: "3", shift: "#" },
  { name: "4", char: "4", shift: "$" },
  { name: "5", char: "5", shift: "%" },
  { name: "6", char: "6", shift: "^" },
  { name: "7", char: "7", shift: "&" },
  { name: "8", char: "8", shift: "*" },
  { name: "9", char: "9", shift: "(" },
  { name: "0", char: "0", shift: ")" },
  { name: "-", char: "-", shift: "_" },
  { name: "=", char: "=", shift: "+" },
  { name: "delete", shift: "delete", size: "2u", modifier: true },
  { name: "tab", label: "Tab", char: "\t", size: "1-5u", modifier: true },
  { name: "q", char: "q", shift: "Q" },
  { name: "w", char: "w", shift: "W" },
  { name: "e", char: "e", shift: "E" },
  { name: "r", char: "r", shift: "R" },
  { name: "t", char: "t", shift: "T" },
  { name: "y", char: "y", shift: "Y" },
  { name: "u", char: "u", shift: "U" },
  { name: "i", char: "i", shift: "I" },
  { name: "o", char: "o", shift: "O" },
  { name: "p", char: "p", shift: "P" },
  { name: "[", char: "[", shift: "{" },
  { name: "]", char: "]", shift: "}" },
  { name: "\\", char: "\\", shift: "|", size: "1-5u", modifier: true },
  { name: "caps", size: "1-75u", modifier: true },
  { name: "a", char: "a", shift: "A" },
  { name: "s", char: "s", shift: "S" },
  { name: "d", char: "d", shift: "D" },
  { name: "f", char: "f", shift: "F" },
  { name: "g", char: "g", shift: "G" },
  { name: "h", char: "h", shift: "H" },
  { name: "j", char: "j", shift: "J" },
  { name: "k", char: "k", shift: "K" },
  { name: "l", char: "l", shift: "L" },
  { name: ";", char: ";", shift: ":" },
  { name: "'", char: "'", shift: '"' },
  {
    label: "Return",
    name: "return",
    size: "2-25u",
    modifier: true,
    enter: true,
    char: "\n"
  },
  {
    label: "Shift",
    name: "lshift",
    size: "2-25u",
    modifier: true,
    shifter: true
  },
  { name: "z", char: "z", shift: "Z" },
  { name: "x", char: "x", shift: "X" },
  { name: "c", char: "c", shift: "C" },
  { name: "v", char: "v", shift: "V" },
  { name: "b", char: "b", shift: "B" },
  { name: "n", char: "n", shift: "N" },
  { name: "m", char: "m", shift: "M" },
  { name: ",", char: ",", shift: "<" },
  { name: ".", char: ".", shift: ">" },
  { name: "/", char: "/", shift: "?" },
  { label: "Shift", name: "rshift", size: "2-75u", modifier: true },
  { label: "Control", name: "lcontrol", size: "1-25u", modifier: true },
  { label: "Option", name: "loption", size: "1-25u", modifier: true },
  { label: "Command", name: "lcommand", size: "1-25u", modifier: true },
  { label: "Space", name: "space", char: " ", shift: " ", size: "7-25u" },
  { label: "Command", name: "rcommand", size: "1-25u", modifier: true },
  { label: "Option", name: "roption", size: "1-25u", modifier: true },
  { label: "Control", name: "rcontrol", size: "1-25u", modifier: true }
];

const Key = ({
  label,
  name,
  modifier,
  escape,
  size,
  shifting,
  enter,
  shift,
  short,
  blank,
  char,
  caps,
  setShift,
  setCaps
}) => {
  const getValueSetter = () => {
    const nodeName = document.activeElement.nodeName;
    let nodeElement;
    if (nodeName === "INPUT") nodeElement = "HTMLInputElement";
    else if (nodeName === "TEXTAREA") nodeElement = "HTMLTextAreaElement";
    else return;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window[nodeElement].prototype,
      "value"
    ).set;
    return nativeInputValueSetter;
  };
  const getSelection = () => {
    const { value } = document.activeElement;
    let selectionStart;
    let selectionEnd;
    try {
      selectionStart = document.activeElement.selectionStart;
      selectionEnd = document.activeElement.selectionEnd;
    } catch (err) {
      selectionStart = value.length;
      selectionEnd = value.length;
    }
    return { selectionStart, selectionEnd };
  };
  const backspace = () => {
    const { value } = document.activeElement;
    const { selectionStart, selectionEnd } = getSelection();

    let nextValue;
    let nextSelectionPosition;
    if (selectionStart === selectionEnd) {
      nextValue =
        value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
      nextSelectionPosition = selectionStart - 1;
    } else {
      nextValue =
        value.substring(0, selectionStart) + value.substring(selectionEnd);
      nextSelectionPosition = selectionStart;
    }
    nextSelectionPosition =
      nextSelectionPosition > 0 ? nextSelectionPosition : 0;
    const inputSet = getValueSetter();

    inputSet.call(document.activeElement, nextValue);

    setTimeout(() => {
      document.activeElement.focus();
      try {
        document.activeElement.setSelectionRange(
          nextSelectionPosition,
          nextSelectionPosition
        );
      } catch (e) {
        console.error(e);
      }
    }, 0);
    setShift(false);

    document.activeElement.dispatchEvent(new Event("input", { bubbles: true }));
    document.activeElement.dispatchEvent(
      new Event("change", { bubbles: true })
    );
  };
  return (
    <div
      onMouseDown={e => {
        e.stopPropagation();
        e.preventDefault();

        if (name === "rshift" || name === "lshift") {
          setShift(!shifting);
          return;
        }
        if (name === "caps") {
          setCaps(!caps);
          return;
        }
        if (
          name === "rcontrol" ||
          name === "lcontrol" ||
          name === "roption" ||
          name === "loption" ||
          name === "rcommand" ||
          name === "lcommand"
        ) {
          return;
        }
        if (name === "delete") {
          backspace();
          return;
        }

        const inputSet = getValueSetter();
        if (!inputSet) return;
        const { value } = document.activeElement;
        const { selectionStart, selectionEnd } = getSelection();
        const nextValue =
          value.substring(0, selectionStart) +
          (shifting ? shift : char) +
          value.substring(selectionEnd);

        inputSet.call(document.activeElement, nextValue);

        setTimeout(() => {
          document.activeElement.focus();
          try {
            const offset = !isFinite(char) ? char.length : 1;
            document.activeElement.setSelectionRange(
              selectionStart + offset,
              selectionStart + offset
            );
          } catch (err) {
            console.error(err);
          }
        });
        setShift(false);

        document.activeElement.dispatchEvent(
          new Event("input", { bubbles: true })
        );
        document.activeElement.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }}
      className={`key ${size ? "size-" + size : ""} ${escape ? "escape" : ""} ${
        modifier ? "modifier" : ""
      } ${enter ? "enter" : ""} ${short ? "short" : ""} ${
        blank ? "blank" : ""
      }`}
    >
      {label || (shifting ? shift : char) || name}
    </div>
  );
};

class Keyboard extends Component {
  state = { shift: false, caps: false };
  render() {
    const { shift, caps } = this.state;
    return (
      <div>
        <div className="keyboard">
          {keys.map(k => (
            <Key
              key={k.name}
              {...k}
              shifting={shift || caps}
              setShift={s => this.setState({ shift: s })}
              setCaps={c => this.setState({ caps: c })}
              caps={caps}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Keyboard;
