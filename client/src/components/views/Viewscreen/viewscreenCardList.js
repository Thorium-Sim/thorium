import React from "react";
import * as ViewscreenCards from "../../viewscreens";
const cards = Object.keys(ViewscreenCards)
  .filter(c => c.indexOf("Config") === -1)
  .sort();

const ViewscreenCardList = ({ previewComponent, viewscreen, update }) => {
  return (
    <div className="viewscreen-card-list">
      {cards.map(c => (
        <div
          key={c}
          className={`viewscreen-card ${
            viewscreen && viewscreen.component === c ? "previewing" : ""
          } ${previewComponent === c ? "selected" : ""}`}
          onClick={() => update(c)}
        >
          <img
            alt={`Viewscreen Preview ${c}`}
            src={`/viewscreen/${c}.jpg`}
            draggable="false"
          />
          <p>{c}</p>
        </div>
      ))}
    </div>
  );
};
export default ViewscreenCardList;
