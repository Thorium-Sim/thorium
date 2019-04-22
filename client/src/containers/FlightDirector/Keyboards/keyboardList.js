import React, { Component } from "react";
import { ListGroupItem } from "reactstrap";
class KeyboardList extends Component {
  componentDidMount() {
    this.sub = this.props.subscribe();
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  render() {
    const { keyboard, selectedKeyboard, selectKeyboard } = this.props;
    return keyboard
      ? keyboard.map(k => (
          <ListGroupItem
            key={k.id}
            active={selectedKeyboard === k.id}
            tag="button"
            action
            onClick={() => selectKeyboard(k.id)}
          >
            {k.name}
          </ListGroupItem>
        ))
      : null;
  }
}

export default KeyboardList;
