import React from "react";
import useInterpolate from "./useInterpolate";
import Phasers from "./phasers";
import Fighters from "./fighters";
import calculatePosition from "./calculatePosition";

const FighterCanvas = ({
  enemies,
  fighters,
  interval,
  fighterId,
  targeted,
  setTargeted,
  phasers,
  torpedos,
  simulator
}) => {
  const fighterContacts = useInterpolate(
    torpedos
      .map(t => ({ ...t, type: "torpedo" }))
      .concat(
        enemies.map(e => ({ ...e, type: "enemy" })).filter(f => !f.docked)
      )
      .concat(fighters.filter(f => !f.docked)),
    interval
  );
  const fighter = fighterContacts.find(c => c.id === fighterId) || {};
  const { position: center = { x: 0, y: 0, z: 0 } } = fighter;
  const { x, y } = calculatePosition({
    position: { x: 0, y: 0 },
    center: center,
    zoomFactor: 10,
    track: true
  });
  const { x: smX, y: smY } = calculatePosition({
    position: { x: 0, y: 0 },
    center: center,
    zoomFactor: 1,
    track: false
  });
  return (
    <div
      className="fighter-canvas"
      style={{
        backgroundPosition: `${x}% ${y}%`
      }}
    >
      <Phasers phasers={phasers} center={center} />
      <Fighters
        fighters={fighterContacts}
        interval={interval}
        center={center}
        fighterId={fighterId}
        targeted={targeted}
        setTargeted={setTargeted}
      />
      <div
        className="simulator-base"
        style={{
          transform: `translate(${x}%, ${y}%)`
        }}
      >
        <img
          className="simulator-image"
          src={`/assets${simulator.assets.top}`}
          draggable={false}
          alt=""
        />
      </div>
      <div className="inner-canvas">
        <div
          className="simulator-base"
          style={{
            transform: `translate(${smX}%, ${smY}%)`
          }}
        >
          <div />
        </div>
        <Fighters
          fighters={fighterContacts}
          interval={interval}
          center={center}
          zoomFactor={1}
          track={false}
          fighterId={fighterId}
          miniMap
        />
      </div>
    </div>
  );
};
export default FighterCanvas;
