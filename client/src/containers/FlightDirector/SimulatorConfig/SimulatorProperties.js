import React from "react";
import { Card } from "reactstrap";

const properties = [
  "Simulator",
  "Stations",
  "Decks",
  "Systems",
  "Inventory",
  "Crew",
  "Assets",
  "Docking",
  "DamageReports",
  "Library",
  "Panels",
  "Ambiance"
];
export default ({ selectProperty, selectedProperty }) => {
  return (
    <Card className="flex-max auto-scroll">
      {properties.map(p => (
        <li
          key={p}
          onClick={() => {
            selectProperty(p);
          }}
          className={`list-group-item ${
            selectedProperty === p ? "selected" : ""
          }`}
        >
          {p}
        </li>
      ))}
    </Card>
  );
};
