import React from "react";
import {Label as RsLabel} from "reactstrap";

const Label = ({...props}) => {
  return <RsLabel {...props} style={{display: "block", ...props.style}} />;
};
export default Label;
