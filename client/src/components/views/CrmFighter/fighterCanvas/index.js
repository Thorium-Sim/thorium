import React from "react";
import useInterpolate from "./useInterpolate";
import Phasers from "./phasers";
import Fighters from "./fighters";
import useDimensions from "helpers/hooks/useDimensions";
import calculatePosition from "./calculatePosition";

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
  const [ref, dims] = useDimensions();
  const fighter = fighterContacts.find(c => c.id === fighterId);
  const { position: center } = fighter;
  const { x, y } = calculatePosition({
    position: { x: 0, y: 0 },
    center: center,
    zoomFactor: 10,
    track: true
  });

  return (
    <div
      className="fighter-canvas"
      ref={ref}
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

      <div className="inner-canvas">
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
