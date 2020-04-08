import React from "react";
import {ListGroupItem as RSListGroupItem} from "reactstrap";
import useSoundEffect from "../hooks/useSoundEffect";

const ListGroupItem = ({
  onClick = () => {},
  onMouseOver = () => {},
  silent = false,
  ...props
}) => {
  const playEffect = useSoundEffect();
  const click = e => {
    if (!silent) {
      playEffect("buttonClick");
    }
    onClick(e);
  };
  return <RSListGroupItem onClick={click} {...props} />;
};
export default ListGroupItem;
