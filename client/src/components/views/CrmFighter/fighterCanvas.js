import React from "react";
import useInterpolate from "./useInterpolate";

const Fighters = ({ fighters, interval }) => {
  const fighterContacts = useInterpolate(fighters, interval);
  return fighterContacts.map(e => (
    <div
      key={e.id}
      className="enemy-outer"
      style={{
        transform: `translate(${e.position.x / (1000 / 50) + 50}%,${e.position
          .y /
          (1000 / 50) +
          50}%)`
      }}
    >
      <div className="enemy-inner" style={{ backgroundColor: "#0f0" }} />
    </div>
  ));
};
const FighterCanvas = ({ enemies, fighters, interval }) => {
  const enemyContacts = useInterpolate(enemies, interval);
  return (
    <div className="fighter-canvas">
      {enemyContacts.map(e => (
        <div
          key={e.id}
          className="enemy-outer"
          style={{
            transform: `translate(${e.position.x / (1000 / 50) + 50}%,${e
              .position.y /
              (1000 / 50) +
              50}%)`
          }}
        >
          <div className="enemy-inner" />
        </div>
      ))}
      <Fighters fighters={fighters} interval={interval} />
    </div>
  );
};
export default FighterCanvas;
