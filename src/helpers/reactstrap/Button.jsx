import React from "react";
import {Button as RSButton} from "reactstrap";
import useSoundEffect from "../hooks/useSoundEffect";

const Button = ({
  onMouseDown = () => {},
  onMouseOver = () => {},
  silent = false,
  ...props
}) => {
  const playEffect = useSoundEffect();
  const mouseDown = e => {
    if (!silent) {
      playEffect("buttonClick");
    }
    onMouseDown(e);
  };
  const mouseOver = e => {
    if (!silent && !props.disabled) {
      playEffect("buttonHover");
    }
    onMouseOver(e);
  };
  return (
    <RSButton onMouseDown={mouseDown} onMouseOver={mouseOver} {...props} />
  );
};
export default Button;
