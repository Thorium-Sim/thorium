import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class DestinationSelect extends Component {
  state = { dropdownOpen: false };
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  render() {
    const { systems, destination, select } = this.props;
    const selectedSystem = systems.find(s => s.id === destination);
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {selectedSystem ? selectedSystem.displayName : "Select a System"}
        </DropdownToggle>
        <DropdownMenu>
          {systems
            .concat()
            .sort((a, b) => {
              if (a.type > b.type) return 1;
              if (a.type < b.type) return -1;
              return 0;
            })
            .map(s => (
              <DropdownItem key={s.id} onClick={() => select(s.id)}>
                {s.displayName}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default DestinationSelect;
