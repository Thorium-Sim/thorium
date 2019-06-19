import React from "react";
import { Button as RSButton } from "reactstrap";
import useSoundEffect from "../hooks/useSoundEffect";

const Button = ({
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
    if (!silent) {
      playEffect("buttonHover");
    }
    onMouseOver(e);
  };
  return <RSButton onClick={click} onMouseOver={mouseOver} {...props} />;
};
export default Button;
