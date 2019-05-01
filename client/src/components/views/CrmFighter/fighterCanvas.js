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
const Fighters = ({
  fighters,
  zoomFactor = 10,
  center,
  track,
  fighterId,
  targeted,
  setTargeted = () => {}
}) => {
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
        {e.id === targeted && (
          <img
            draggable="false"
            className="reticule"
            src={require("./reticle.svg")}
            alt="reticule"
          />
        )}
        <div
          className={`enemy-inner ${e.type === "enemy" ? "is-enemy" : ""}`}
          style={{
            width: e.type === "torpedo" ? "5px" : null,
            height: e.type === "torpedo" ? "5px" : null,
            backgroundColor: e.destroyed
              ? "#f0f"
              : e.id === fighterId
              ? "#ff0"
              : e.type === "enemy"
              ? "#800"
              : e.type === "torpedo"
              ? "white"
              : "#0f0"
          }}
          onClick={() => e.type !== "torpedo" && setTargeted(e.id)}
        />
      </div>
    );
  });
};

const Phasers = ({ phasers, center, zoomFactor = 10, track = true }) => {
  return phasers.map(
    ({ target: initTarget, destination: initDestination }, i) => {
      const target = calculatePosition({
        position: initTarget,
        center,
        zoomFactor,
        track
      });
      const destination = calculatePosition({
        position: initDestination,
        center,
        zoomFactor,
        track
      });

      const width = Math.abs(target.x - destination.x) + 0.7;
      const height = Math.abs(target.y - destination.y) + 0.7;
      const left = Math.min(target.x, destination.x) + 0.7;
      const top = Math.min(target.y, destination.y) + 0.7;
      let isRight = true;
      if (
        (target.x > destination.x && target.y < destination.y) ||
        (target.x < destination.x && target.y > destination.y)
      ) {
        isRight = false;
      }
      return (
        <div
          key={`phaser-${i}`}
          className="enemy-outer"
          style={{
            transform: `translate(${left}%, ${top}%)`
          }}
        >
          <div
            style={{
              width: `${width}%`,
              height: `${height}%`,
              background: `linear-gradient(to top ${isRight ? "right" : "left"},
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,0) calc(50% - 2px),
              rgba(255,255,0,0.8) 50%,
              rgba(0,0,0,0) calc(50% + 2px),
              rgba(0,0,0,0) 100%)`
            }}
          />
        </div>
      );
    }
  );
};
const FighterCanvas = ({
  enemies,
  fighters,
  interval,
  fighterId,
  targeted,
  setTargeted,
  phasers,
  torpedos
}) => {
  const fighterContacts = useInterpolate(
    torpedos
      .map(t => ({ ...t, type: "torpedo" }))
      .concat(enemies.map(e => ({ ...e, type: "enemy" })))
      .concat(fighters),
    interval
  );

  const fighter = fighterContacts.find(c => c.id === fighterId);
  const { position: center } = fighter;
  return (
    <div className="fighter-canvas">
      <Phasers phasers={phasers} center={center} />
      <Fighters
        fighters={fighterContacts}
        interval={interval}
        center={center}
        fighterId={fighterId}
        targeted={targeted}
        setTargeted={setTargeted}
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
