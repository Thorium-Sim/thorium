import React from "react";
import {Card} from "helpers/reactstrap";
import {capitalCase} from "change-case";
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
  "SoundEffects",
  "Docking",
  "DamageReports",
  "Library",
  "Panels",
  "Ambiance",
  "CommandLines",
  "Triggers",
  "Interfaces",
  "Keyboards",
  "Midi",
];
export default ({selectProperty, selectedProperty}) => {
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
          {capitalCase(p)}
        </li>
      ))}
    </Card>
  );
};
