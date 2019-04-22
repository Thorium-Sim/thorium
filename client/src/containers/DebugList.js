import React from "react";
import Views from "../components/views";
import { Link } from "react-router-dom";

const viewList = Object.keys(Views)
  .filter(v => {
    return v !== "Offline" && v !== "Login" && v !== "Viewscreen";
  })
  .sort();
const DebugList = () => {
  return (
    <ul
      style={{
        maxHeight: "100%",
        columnWidth: "20vw"
      }}
    >
      {viewList.map(v => {
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
