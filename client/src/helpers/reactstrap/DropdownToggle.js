import React from "react";
import { DropdownToggle as RSDropdownToggle } from "reactstrap";
import useSoundEffect from "../hooks/useSoundEffect";

const DropdownToggle = ({
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
  return (
    <RSDropdownToggle onClick={click} onMouseOver={mouseOver} {...props} />
  );
};
export default DropdownToggle;
