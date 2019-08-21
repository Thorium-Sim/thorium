import React, { Component } from "react";
import boards from "./data.json";
import "./styles.scss";
import Game from "./game";

class App extends Component {
  state = {
    dragging: null
  };
  render() {
    const { dragging } = this.state;
    const board = boards.find(
      b => b.id === this.props.id.replace("robozzle-", "")
    );
    return (
      <div className={`robozzle-root ${dragging ? "dragging" : ""}`}>
        {board && (
          <Game
            key={this.props.id}
            setDragging={which => this.setState({ dragging: which })}
            board={board}
            onWin={this.props.onWin || (() => {})}
          />
        )}
      </div>
    );
  }
}
export default App;
