import React from "react";
import styled from "@emotion/styled";
import Objectives from "../views/Objectives";
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function Obj(props) {
  return (
    <Wrap>
      <Objectives {...props} />
    </Wrap>
  );
}

export default Obj;
