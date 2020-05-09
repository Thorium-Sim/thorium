import React, {Component} from "react";
import "./keyboard.scss";

export const keys = [
  {
    keyCode: "Escape",
    name: "esc",
    char: "",
    modifier: true,
    escape: true,
    short: true,
  },
  {keyCode: "", name: "", short: true, blank: true},
  {keyCode: "F1", name: "F1", short: true},
  {keyCode: "F2", name: "F2", short: true},
  {keyCode: "F3", name: "F3", short: true},
  {keyCode: "F4", name: "F4", short: true},
  {keyCode: "", name: "", short: true, blank: true, size: "quarterU"},
  {keyCode: "F5", name: "F5", short: true},
  {keyCode: "F6", name: "F6", short: true},
  {keyCode: "F7", name: "F7", short: true},
  {keyCode: "F8", name: "F8", short: true},
  {keyCode: "", name: "", short: true, blank: true, size: "quarterU"},
  {keyCode: "F9", name: "F9", short: true},
  {keyCode: "F10", name: "F10", short: true},
  {keyCode: "F11", name: "F11", short: true},
  {keyCode: "F12", name: "F12", short: true},
  {keyCode: "", name: "", short: true, blank: true, size: "halfU"},
  {keyCode: "F13", name: "F13", short: true, ex: true},
  {keyCode: "F14", name: "F14", short: true, ex: true},
  {keyCode: "F15", name: "F15", short: true, ex: true},
  {keyCode: "", name: "", short: true, blank: true, size: "halfU", ex: true},
  {keyCode: "F16", name: "F16", short: true, ex: true},
  {keyCode: "F17", name: "F17", short: true, ex: true},
  {keyCode: "F18", name: "F18", short: true, ex: true},
  {keyCode: "F19", name: "F19", short: true, ex: true},
  {keyCode: "Backquote", name: "`", char: "`", shift: "~"},
  {keyCode: "Digit1", name: "1", char: "1", shift: "!"},
  {keyCode: "Digit2", name: "2", char: "2", shift: "@"},
  {keyCode: "Digit3", name: "3", char: "3", shift: "#"},
  {keyCode: "Digit4", name: "4", char: "4", shift: "$"},
  {keyCode: "Digit5", name: "5", char: "5", shift: "%"},
  {keyCode: "Digit6", name: "6", char: "6", shift: "^"},
  {keyCode: "Digit7", name: "7", char: "7", shift: "&"},
  {keyCode: "Digit8", name: "8", char: "8", shift: "*"},
  {keyCode: "Digit9", name: "9", char: "9", shift: "("},
  {keyCode: "Digit0", name: "0", char: "0", shift: ")"},
  {keyCode: "Minus", name: "-", char: "-", shift: "_"},
  {keyCode: "Equal", name: "=", char: "=", shift: "+"},
  {
    keyCode: "Backspace",
    name: "delete",
    shift: "delete",
    size: "1-5u",
    modifier: true,
  },
  {keyCode: "", name: "", short: true, blank: true, size: "halfU", ex: true},
  {keyCode: "Insert", char: "insert", ex: true},
  {keyCode: "Home", char: "home", ex: true},
  {keyCode: "PageUp", char: "page up", ex: true},
  {keyCode: "", name: "", short: true, blank: true, size: "halfU", ex: true},
  {keyCode: "NumLock", char: "num lock", ex: true},
  {keyCode: "NumpadEqual", char: "=", ex: true},
  {keyCode: "NumpadDivide", char: "/", ex: true},
  {keyCode: "NumpadMultiply", char: "*", ex: true},
  {
    keyCode: "Tab",
    name: "tab",
    label: "Tab",
    char: "\t",
    size: "1-5u",
    modifier: true,
  },
  {keyCode: "KeyQ", name: "q", char: "q", shift: "Q"},
  {keyCode: "KeyW", name: "w", char: "w", shift: "W"},
  {keyCode: "KeyE", name: "e", char: "e", shift: "E"},
  {keyCode: "KeyR", name: "r", char: "r", shift: "R"},
  {keyCode: "KeyT", name: "t", char: "t", shift: "T"},
  {keyCode: "KeyY", name: "y", char: "y", shift: "Y"},
  {keyCode: "KeyU", name: "u", char: "u", shift: "U"},
  {keyCode: "KeyI", name: "i", char: "i", shift: "I"},
  {keyCode: "KeyO", name: "o", char: "o", shift: "O"},
  {keyCode: "KeyP", name: "p", char: "p", shift: "P"},
  {keyCode: "BracketLeft", name: "[", char: "[", shift: "{"},
  {keyCode: "BracketRight", name: "]", char: "]", shift: "}"},
  {
    keyCode: "Backslash",
    name: "\\",
    char: "\\",
    shift: "|",
    size: "1u",
    modifier: true,
  },
  {keyCode: "", name: "", short: true, blank: true, size: "halfU", ex: true},
  {keyCode: "Delete", char: "delete", ex: true},
  {keyCode: "End", char: "end", ex: true},
  {keyCode: "PageDown", char: "page down", ex: true},
  {keyCode: "", name: "", short: true, blank: true, size: "halfU", ex: true},
  {keyCode: "Numpad7", char: "7", ex: true},
  {keyCode: "Numpad8", char: "8", ex: true},
  {keyCode: "Numpad9", char: "9", ex: true},
  {keyCode: "NumpadSubtract", char: "-", ex: true},
  {keyCode: "CapsLock", name: "caps", size: "1-75u", modifier: true},
  {keyCode: "KeyA", name: "a", char: "a", shift: "A"},
  {keyCode: "KeyS", name: "s", char: "s", shift: "S"},
  {keyCode: "KeyD", name: "d", char: "d", shift: "D"},
  {keyCode: "KeyF", name: "f", char: "f", shift: "F"},
  {keyCode: "KeyG", name: "g", char: "g", shift: "G"},
  {keyCode: "KeyH", name: "h", char: "h", shift: "H"},
  {keyCode: "KeyJ", name: "j", char: "j", shift: "J"},
  {keyCode: "KeyK", name: "k", char: "k", shift: "K"},
  {keyCode: "KeyL", name: "l", char: "l", shift: "L"},
  {keyCode: "Semicolon", name: ";", char: ";", shift: ":"},
  {keyCode: "Quote", name: "'", char: "'", shift: '"'},
  {
    keyCode: "Enter",
    label: "Return",
    name: "return",
    size: "1-75u",
    modifier: true,
    enter: true,
    char: "\n",
  },
  {keyCode: "", name: "", short: true, blank: true, size: "4u", ex: true},
  {keyCode: "Numpad4", char: "4", ex: true},
  {keyCode: "Numpad5", char: "5", ex: true},
  {keyCode: "Numpad6", char: "6", ex: true},
  {keyCode: "NumpadAdd", char: "+", ex: true},
  {
    label: "Shift",
    name: "lshift",
    size: "2-25u",
    modifier: true,
    shifter: true,
  },

  {keyCode: "KeyZ", name: "z", char: "z", shift: "Z"},
  {keyCode: "KeyX", name: "x", char: "x", shift: "X"},
  {keyCode: "KeyC", name: "c", char: "c", shift: "C"},
  {keyCode: "KeyV", name: "v", char: "v", shift: "V"},
  {keyCode: "KeyB", name: "b", char: "b", shift: "B"},
  {keyCode: "KeyN", name: "n", char: "n", shift: "N"},
  {keyCode: "KeyM", name: "m", char: "m", shift: "M"},
  {keyCode: "Comma", name: ",", char: ",", shift: "<"},
  {keyCode: "Period", name: ".", char: ".", shift: ">"},
  {keyCode: "Slash", name: "/", char: "/", shift: "?"},
  {label: "Shift", name: "rshift", size: "2-25u", modifier: true},
  {name: "", short: true, blank: true, size: "1-5u", ex: true},
  {keyCode: "ArrowUp", char: "⬆", ex: true},
  {name: "", short: true, blank: true, size: "1-5u", ex: true},
  {keyCode: "Numpad1", char: "1", ex: true},
  {keyCode: "Numpad2", char: "2", ex: true},
  {keyCode: "Numpad3", char: "3", ex: true},
  {keyCode: "NumpadEnter", char: "enter", size: "tall", ex: true},
  {
    label: "Control",
    name: "lcontrol",
    size: "1-25u",
    modifier: true,
  },
  {
    label: "Option",
    name: "loption",
    size: "1-25u",
    modifier: true,
  },
  {
    label: "Command",
    name: "lcommand",
    size: "1-25u",
    modifier: true,
  },
  {
    keyCode: "Space",
    label: "Space",
    name: "space",
    char: " ",
    shift: " ",
    size: "7-25u",
  },
  {
    label: "Command",
    name: "rcommand",
    size: "1-25u",
    modifier: true,
  },
  {
    label: "Option",
    name: "roption",
    size: "1-25u",
    modifier: true,
  },
  {
    label: "Control",
    name: "rcontrol",
    size: "1-25u",
    modifier: true,
  },
  {name: "", short: true, blank: true, size: "halfU", ex: true},
  {keyCode: "ArrowLeft", char: "⬅", ex: true},
  {keyCode: "ArrowDown", char: "⬇", ex: true},
  {keyCode: "ArrowRight", char: "➡", ex: true},
  {name: "", short: true, blank: true, size: "halfU", ex: true},
  {keyCode: "Numpad0", char: "0", size: "2u", ex: true},
  {keyCode: "NumpadDecimal", char: ".", ex: true},
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
  setCaps,
  ex,
  showEx,
}) => {
  const getValueSetter = () => {
    const nodeName = document.activeElement.nodeName;
    let nodeElement;
    if (nodeName === "INPUT") nodeElement = "HTMLInputElement";
    else if (nodeName === "TEXTAREA") nodeElement = "HTMLTextAreaElement";
    else return;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window[nodeElement].prototype,
      "value",
    ).set;
    return nativeInputValueSetter;
  };
  const getSelection = () => {
    const {value} = document.activeElement;
    let selectionStart;
    let selectionEnd;
    try {
      selectionStart = document.activeElement.selectionStart;
      selectionEnd = document.activeElement.selectionEnd;
    } catch (err) {
      selectionStart = value.length;
      selectionEnd = value.length;
    }
    return {selectionStart, selectionEnd};
  };
  const backspace = () => {
    const {value} = document.activeElement;
    const {selectionStart, selectionEnd} = getSelection();

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
          nextSelectionPosition,
        );
      } catch (e) {
        console.error(e);
      }
    }, 0);
    setShift(false);

    document.activeElement.dispatchEvent(new Event("input", {bubbles: true}));
    document.activeElement.dispatchEvent(new Event("change", {bubbles: true}));
  };
  if (ex && !showEx) return null;
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
        const {value} = document.activeElement;
        const {selectionStart, selectionEnd} = getSelection();
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
              selectionStart + offset,
            );
          } catch (err) {
            console.error(err);
          }
        });
        setShift(false);

        document.activeElement.dispatchEvent(
          new Event("input", {bubbles: true}),
        );
        document.activeElement.dispatchEvent(
          new Event("change", {bubbles: true}),
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
  state = {shift: false, caps: false};
  render() {
    const {shift, caps} = this.state;
    return (
      <div>
        <div className={`keyboard ${this.props.showEx ? "keyboard-ex" : ""}`}>
          {keys.map(k => (
            <Key
              key={k.name}
              {...k}
              shifting={shift || caps}
              setShift={s => this.setState({shift: s})}
              setCaps={c => this.setState({caps: c})}
              caps={caps}
              showEx={this.props.showEx}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Keyboard;
