import React, {Component, Fragment} from "react";
import GameBoard from "./gameboard";
import Controls from "./controls";
import Commands from "./commands";
import {beginPointerDrag, getEventCoords} from "../hooks/usePointerDrag";

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
      clean: true,
    };
  }
  reset = () => {
    clearTimeout(this.timeout);
    this.setState(state => ({
      clean: true,
      functions: state.functions,
      stack: [],
      ...this.props.board,
    }));
  };
  // Dragging runs on pointer events so mouse and touch take the same path.
  // The old code was unusable on a touchscreen for two independent reasons:
  // it moved the piece with `evt.movementX/Y`, which is mouse-only, and it
  // resolved the drop slot from `evt.target`, which on touch is the element the
  // gesture *started* on rather than the one under the finger.
  cancelDrag = null;
  // Lift an already-placed command back out of its slot.
  commandPointerDown = evt => {
    const funcnum = evt.target.dataset.funcnum;
    const index = evt.target.dataset.position;
    const existing =
      this.state.functions[funcnum] && this.state.functions[funcnum][index];
    if (!existing) return;
    const {command, color} = existing;
    this.setState(state => ({
      functions: {
        ...state.functions,
        [funcnum]: state.functions[funcnum].map((f, i) => {
          if (i === parseInt(index, 10)) return null;
          return f;
        }),
      },
    }));
    this.startDrag(evt, command, color, 15);
  };
  // Pick a fresh command up off the palette.
  pointerDown = (evt, command, color) => {
    this.startDrag(evt, command, color, 20);
  };
  startDrag(evt, command, color, grabOffset) {
    const board = this.gameboardRef.current;
    const coords = getEventCoords(evt);
    if (!board || !coords) return;
    const dimensions = board.getBoundingClientRect();
    // Absolute position each time rather than an accumulated delta, so there is
    // no dependence on `movementX`/`movementY`.
    const toLocal = c => ({
      x: c.clientX - grabOffset - dimensions.left,
      y: c.clientY - grabOffset - dimensions.top,
    });

    this.props.setDragging(true);
    this.setState({dragging: {position: toLocal(coords), command, color}});

    this.cancelDrag = beginPointerDrag(evt, {
      onMove: state => {
        this.setState({dragging: {position: toLocal(state), command, color}});
      },
      onEnd: state => {
        this.cancelDrag = null;
        this.props.setDragging(false);
        // Hit-test the release point. Pointer capture retargets `pointerup` to
        // the element the drag started on, so the event's own target is never
        // the slot being dropped into.
        const dropTarget = document.elementFromPoint(
          state.clientX,
          state.clientY,
        );
        const dataset = (dropTarget && dropTarget.dataset) || {};
        const funcNum = dataset.funcnum;
        const position = parseInt(dataset.position, 10);
        if (!funcNum) return this.setState({dragging: null});
        const action = {};
        this.setState(prev => {
          if (!prev.dragging) return {dragging: null};
          if (prev.dragging.command) action.command = prev.dragging.command;
          if (prev.dragging.color) action.color = prev.dragging.color;
          if (prev.dragging.color === "clear") action.color = null;
          const func = prev.functions[funcNum] || [];
          func[position] = {...func[position], ...action};
          return {
            dragging: null,
            functions: {...prev.functions, [funcNum]: func},
          };
        });
      },
    });
    if (!this.cancelDrag) {
      this.props.setDragging(false);
      this.setState({dragging: null});
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
    if (this.cancelDrag) this.cancelDrag();
    this.cancelDrag = null;
  }
  start = () => {
    this.reset();
    clearTimeout(this.timeout);
    // Start with F1
    const {functions} = this.state;
    const starting = functions.f1;
    const stack = [].concat(starting);
    this.setState({stack, clean: false});
    setTimeout(this.runStack, this.state.delay);
  };
  runStack = () => {
    this.setState(state => {
      const {stack, Colors, RobotRow, RobotCol} = state;
      if (stack.length === 0) {
        clearTimeout(this.timeout);
        return;
      }

      const action = stack.shift();
      if (!action) {
        this.runNow();
        return {stack};
      }
      const {command, color} = action;
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
      return {stack};
    });
  };
  runNow = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.runStack, 0);
  };
  performAction = action => {
    this.setState(state => {
      const {Colors, RobotRow, RobotCol, RobotDir, functions, stack} = state;
      let color = action.split("-")[1];
      switch (action) {
        case "left":
          return {
            RobotDir: parseInt(RobotDir, 10) - 1,
          };
        case "right":
          return {
            RobotDir: parseInt(RobotDir, 10) + 1,
          };
        case "forward":
          switch (Math.abs(parseInt(RobotDir, 10) + 400) % 4) {
            case 0:
              return {
                RobotCol: Math.max(0, parseInt(RobotCol, 10) + 1),
              };
            case 1:
              return {
                RobotRow: Math.max(0, parseInt(RobotRow, 10) + 1),
              };
            case 2:
              return {
                RobotCol: Math.max(0, parseInt(RobotCol, 10) - 1),
              };
            case 3:
              return {
                RobotRow: Math.max(0, parseInt(RobotRow, 10) - 1),
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
            stack: functions[action].concat(stack),
          };
        case "paint-red":
        case "paint-green":
        case "paint-blue":
          if (color === "red") color = "R";
          if (color === "green") color = "G";
          if (color === "blue") color = "B";
          return {
            Colors: Colors.map((row, i) => {
              if (i === parseInt(RobotRow, 10)) {
                return replaceAt(row, parseInt(RobotCol, 10), color);
              }
              return row;
            }),
          };
        default:
          return;
      }
    }, this.checkGame);
  };
  checkGame = () => {
    const {Items, RobotCol, RobotRow} = this.state;
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
          }),
        }),
        this.checkGame,
      );
    }
    // Clear a star if we are on it.
    const stars = Items.reduce(
      (prev, next) => prev + (next.match(/\*/g) || []).length,
      0,
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
    const {dragging, functions, delay} = this.state;
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
                onPointerDown={this.commandPointerDown}
              />
              <Commands
                {...this.state}
                onPointerDown={this.pointerDown}
                dragging={dragging}
              />
              <div style={{display: "flex"}}>
                <button onClick={this.start} style={{flex: 1}}>
                  Go
                </button>
                <button onClick={this.reset} style={{flex: 1}}>
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
              transform: `translate(${dragging.position.x}px, ${dragging.position.y}px)`,
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
