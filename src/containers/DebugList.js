import React from "react";
import viewList from "../components/views/list.js";
import { Link } from "react-router-dom";
const DebugList = () => {
  return (
    <ul
      style={{
        maxHeight: "100%",
        columnWidth: "20vw"
      }}
    >
      {viewList.sort().map(v => {
        return (
          <li key={v}>
            <Link to={`/test/${v}`}>{v}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DebugList;
