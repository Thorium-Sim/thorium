import React from "react";
import { DropdownItem as RSDropdownItem } from "reactstrap";
import useSoundEffect from "../hooks/useSoundEffect";

const DropdownItem = ({
  onClick = () => {},
  onMouseOver = () => {},
  silent,
  ...props
}) => {
  const playEffect = useSoundEffect();
  const click = e => {
    if (!silent) {
      playEffect("buttonClick");
    }
    onClick(e);
  };
  const mouseOver = e => {
    if (!silent && !props.disabled) {
      playEffect("buttonHover");
    }
    onMouseOver(e);
  };
  return <RSDropdownItem onClick={click} onMouseOver={mouseOver} {...props} />;
};
export default DropdownItem;
