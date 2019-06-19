import React from "react";
import FontAwesome from "react-fontawesome";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { addForm = () => {} } = this.props;
    return (
      <ButtonDropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        direction="up"
      >
        <DropdownToggle color="info" outline caret>
          Add Fields
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => addForm("Short")}>
            <FontAwesome name="font" fixedWidth /> Short Answer
          </DropdownItem>
          <DropdownItem onClick={() => addForm("Long")}>
            <FontAwesome name="align-left" fixedWidth /> Paragraph
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => addForm("Multi")}>
            <FontAwesome name="list-ul" fixedWidth /> Multiple Choice
          </DropdownItem>
          <DropdownItem onClick={() => addForm("Checkbox")}>
            <FontAwesome name="check-square-o" fixedWidth /> Checkbox
          </DropdownItem>
          <DropdownItem onClick={() => addForm("Dropdown")}>
            <FontAwesome name="caret-square-o-down" fixedWidth /> Dropdown
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => addForm("Range")}>
            <FontAwesome name="arrows-h" fixedWidth /> Range
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
