import React, { Component, Fragment } from "react";
import GameBoard from "./gameboard";
import Controls from "./controls";
import Commands from "./commands";

function replaceAt(string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.board,
      functions: {},
      stack: [],
      delay: 200,
      clean: true
    };
  }
  reset = () => {
    clearTimeout(this.timeout);
    this.setState(state => ({
      clean: true,
      functions: state.functions,
      stack: [],
      ...this.props.board
    }));
  };
  commandMouseDown = evt => {
    const funcnum = evt.target.dataset.funcnum;
    const index = evt.target.dataset.position;
    const dimensions = this.gameboardRef.current.getBoundingClientRect();

    const position = {
      x: evt.clientX - dimensions.left - 15,
      y: evt.clientY - dimensions.top - 15
    };
    this.setState(state => {
      // Check to see if there is a function there.
      if (state.functions[funcnum] && state.functions[funcnum][index]) {
        const { command, color } = state.functions[funcnum][index];
        this.props.setDragging(true);
        document.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mouseup", this.mouseUp);
        return {
          dragging: {
            position,
            command,
            color
          },
          functions: {
            ...state.functions,
            [funcnum]: state.functions[funcnum].map((f, i) => {
              if (i === parseInt(index, 10)) return null;
              return f;
            })
          }
        };
      }
      return {};
    });
  };
  mouseDown = (position, command, color) => {
    this.props.setDragging(true);
    const dimensions = this.gameboardRef.current.getBoundingClientRect();
    this.setState({
      dragging: {
        position: {
          x: position.x - 20 - dimensions.left,
          y: position.y - 20 - dimensions.top
        },
        command,
        color
      }
    });
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
  };
  mouseMove = evt => {
    this.setState(state => ({
      dragging: {
        ...state.dragging,
        position: {
          x: state.dragging.position.x + evt.movementX,
          y: state.dragging.position.y + evt.movementY
        }
      }
    }));
  };
  mouseUp = evt => {
    document.removeEventListener("mousemove", this.mouseMove);
    this.props.setDragging(false);
    document.removeEventListener("mouseup", this.mouseUp);
    const funcNum = evt.target.dataset.funcnum;
    const position = parseInt(evt.target.dataset.position, 10);
    if (!funcNum) return this.setState({ dragging: null });
    const action = {};
    this.setState(state => {
      if (state.dragging.command) action.command = state.dragging.command;
      if (state.dragging.color) action.color = state.dragging.color;
      if (state.dragging.color === "clear") action.color = null;
      const func = state.functions[funcNum] || [];
      func[position] = { ...func[position], ...action };
      return {
        dragging: null,
        functions: { ...state.functions, [funcNum]: func }
      };
    });
  };
  start = () => {
    this.reset();
    clearTimeout(this.timeout);
    // Start with F1
    const { functions } = this.state;
    const starting = functions.f1;
    const stack = [].concat(starting);
    this.setState({ stack, clean: false });
    setTimeout(this.runStack, this.state.delay);
  };
  runStack = () => {
    this.setState(state => {
      const { stack, Colors, RobotRow, RobotCol } = state;
      if (stack.length === 0) {
        clearTimeout(this.timeout);
        return;
      }

      const action = stack.shift();
      if (!action) {
        this.runNow();
        return { stack };
      }
      const { command, color } = action;
      const boardColor = Colors[parseInt(RobotRow, 10)][parseInt(RobotCol, 10)];

      if (
        !color ||
        (color === "red" && boardColor === "R") ||
        (color === "green" && boardColor === "G") ||
        (color === "blue" && boardColor === "B")
      ) {
        this.performAction(command);
        this.timeout = setTimeout(this.runStack, this.state.delay);
      } else {
        this.runNow();
      }
      return { stack };
    });
  };
  runNow = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.runStack, 0);
  };
  performAction = action => {
    this.setState(state => {
      const { Colors, RobotRow, RobotCol, RobotDir, functions, stack } = state;
      switch (action) {
        case "left":
          return {
            RobotDir: parseInt(RobotDir, 10) - 1
          };
        case "right":
          return {
            RobotDir: parseInt(RobotDir, 10) + 1
          };
        case "forward":
          switch (Math.abs(parseInt(RobotDir, 10) + 400) % 4) {
            case 0:
              return {
                RobotCol: Math.max(0, parseInt(RobotCol, 10) + 1)
              };
            case 1:
              return {
                RobotRow: Math.max(0, parseInt(RobotRow, 10) + 1)
              };
            case 2:
              return {
                RobotCol: Math.max(0, parseInt(RobotCol, 10) - 1)
              };
            case 3:
              return {
                RobotRow: Math.max(0, parseInt(RobotRow, 10) - 1)
              };
            default:
              return {};
          }
        case "f1":
        case "f2":
        case "f3":
        case "f4":
        case "f5":
        case "f6":
          this.runNow();
          return {
            stack: functions[action].concat(stack)
          };
        case "paint-red":
        case "paint-green":
        case "paint-blue":
          let color = action.split("-")[1];
          if (color === "red") color = "R";
          if (color === "green") color = "G";
          if (color === "blue") color = "B";
          return {
            Colors: Colors.map((row, i) => {
              if (i === parseInt(RobotRow, 10)) {
                return replaceAt(row, parseInt(RobotCol, 10), color);
              }
              return row;
            })
          };
        default:
          return;
      }
    }, this.checkGame);
  };
  checkGame = () => {
    const { Items, RobotCol, RobotRow } = this.state;
    if (Items[RobotRow][RobotCol] === "#") {
      return setTimeout(this.reset, this.delay * 4);
    }
    if (Items[RobotRow][RobotCol] === "*") {
      return this.setState(
        state => ({
          Items: state.Items.map((row, i) => {
            if (i === parseInt(RobotRow, 10)) {
              return replaceAt(row, parseInt(RobotCol, 10), "%");
            }
            return row;
          })
        }),
        this.checkGame
      );
    }
    // Clear a star if we are on it.
    const stars = Items.reduce(
      (prev, next) => prev + (next.match(/\*/g) || []).length,
      0
    );
    if (stars === 0) {
      clearTimeout(this.timeout);
      setTimeout(() => {
        this.props.onWin();
      }, this.state.delay);
    }
  };
  gameboardRef = React.createRef();
  render() {
    const { dragging, functions, delay } = this.state;
    return (
      <Fragment>
        <style>
          {`.gameboard {
--delay:${delay}ms
}`}
        </style>
        <div className="gameboard-holder" ref={this.gameboardRef}>
          <Fragment>
            <GameBoard {...this.state} />
            <div className="player-controls">
              <Controls
                {...this.state}
                dragging={dragging}
                functions={functions}
                onMouseDown={this.commandMouseDown}
              />
              <Commands
                {...this.state}
                onMouseDown={this.mouseDown}
                dragging={dragging}
              />
              <div style={{ display: "flex" }}>
                <button onClick={this.start} style={{ flex: 1 }}>
                  Go
                </button>
                <button onClick={this.reset} style={{ flex: 1 }}>
                  Reset
                </button>
              </div>
            </div>
          </Fragment>
        </div>
        {dragging && (
          <div
            className="dragger"
            style={{
              transform: `translate(${dragging.position.x}px, ${
                dragging.position.y
              }px)`
            }}
          >
            <div
              className={`command ${
                dragging.command && dragging.command.indexOf("paint") > -1
                  ? "paint"
                  : ""
              } ${dragging.command} ${
                dragging.color ? `${dragging.color} color` : ""
              }`}
            />
          </div>
        )}
      </Fragment>
    );
  }
}
export default Game;
