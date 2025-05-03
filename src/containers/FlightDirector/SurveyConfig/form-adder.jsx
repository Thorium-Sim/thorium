import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "helpers/reactstrap";
import {
  FaFont,
  FaAlignLeft,
  FaListUl,
  FaRegCheckSquare,
  FaRegCaretSquareDown,
  FaArrowsAltH,
} from "react-icons/fa";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    const {addForm = () => {}} = this.props;
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
            <FaFont /> Short Answer
          </DropdownItem>
          <DropdownItem onClick={() => addForm("Long")}>
            <FaAlignLeft fixedWidth /> Paragraph
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => addForm("Multi")}>
            <FaListUl fixedWidth /> Multiple Choice
          </DropdownItem>
          <DropdownItem onClick={() => addForm("Checkbox")}>
            <FaRegCheckSquare fixedWidth /> Checkbox
          </DropdownItem>
          <DropdownItem onClick={() => addForm("Dropdown")}>
            <FaRegCaretSquareDown fixedWidth /> Dropdown
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => addForm("Range")}>
            <FaArrowsAltH fixedWidth /> Range
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
