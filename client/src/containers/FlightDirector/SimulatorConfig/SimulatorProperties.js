import React from "react";
import { Card } from "reactstrap";
import { titleCase } from "change-case";
const properties = [
  "Simulator",
  "Stations",
  "Missions",
  "Macros",
  "Decks",
  "Systems",
  "Inventory",
  "Crew",
  "Assets",
  "Docking",
  "DamageReports",
  "Library",
  "Panels",
  "Ambiance",
  "CommandLines",
  "Triggers",
  "Interfaces"
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
          {titleCase(p)}
        </li>
      ))}
    </Card>
  );
};
