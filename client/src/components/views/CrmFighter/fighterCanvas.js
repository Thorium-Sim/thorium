import React from "react";
import useInterpolate from "./useInterpolate";

const canvasSize = 2000;
function calculatePosition({ position, center, zoomFactor, track = true }) {
  return {
    x:
      (zoomFactor * (position.x - (track ? center.x : 0))) /
        (canvasSize / 2 / 50) +
      50,
    y:
      (zoomFactor * (position.y - (track ? center.y : 0))) /
        (canvasSize / 2 / 50) +
      50
  };
}
const Fighters = ({ fighters, zoomFactor = 10, center, track, fighterId }) => {
  return fighters.map(e => {
    const { x, y } = calculatePosition({
      position: e.position,
      center,
      zoomFactor,
      track
    });
    return (
      <div
        key={e.id}
        className="enemy-outer"
        style={{
          transform: `translate(${x}%,${y}%)`
        }}
      >
        <div
          className="enemy-inner"
          style={{
            backgroundColor:
              e.id === fighterId ? "#ff0" : e.isEnemy ? "#f00" : "#0f0"
          }}
        />
      </div>
    );
  });
};
const FighterCanvas = ({ enemies, fighters, interval, fighterId }) => {
  const fighterContacts = useInterpolate(
    fighters.concat(enemies.map(e => ({ ...e, isEnemy: true }))),
    interval
  );

  const fighter = fighterContacts.find(c => c.id === fighterId);
  const { position: center } = fighter;
  return (
    <div className="fighter-canvas">
      <Fighters
        fighters={fighterContacts}
        interval={interval}
        center={center}
        fighterId={fighterId}
      />
      <div className="inner-canvas">
        <Fighters
          fighters={fighterContacts}
          interval={interval}
          center={center}
          zoomFactor={1}
          track={false}
          fighterId={fighterId}
        />
      </div>
    </div>
  );
};
export default FighterCanvas;
