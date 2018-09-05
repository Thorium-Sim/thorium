import React from "react";
import Decks from "components/views/ShipStructure/core";

const DecksWrapped = ({ selectedSimulator: sim }) => {
  return (
    <div className="decks">
      <Decks simulator={sim} />
    </div>
  );
};

export default DecksWrapped;
