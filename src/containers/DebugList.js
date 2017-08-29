import React from "react";
import viewList from "../components/views/list.js";
import { Link } from "react-router";
const DebugList = () => {
  return (
    <ul>
      {viewList.sort().map(v => {
        return (
          <li key={v}>
            <Link to={`/test/${v}`}>
              {v}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DebugList;
