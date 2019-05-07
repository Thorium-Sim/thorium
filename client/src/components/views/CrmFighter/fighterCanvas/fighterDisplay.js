import React from "react";
import Explosion from "helpers/explosions";

const FighterDisplay = ({
  fighterId,
  id,
  exploding,
  targeted,
  setTargeted,
  icon,
  size,
  type,
  miniMap
}) => {
  if (miniMap)
    return (
      <div
        className={`enemy-inner ${type === "enemy" ? "is-enemy" : ""}`}
        style={{
          backgroundColor:
            id === fighterId ? "#ff0" : type === "enemy" ? "#800" : "#0f0"
        }}
      />
    );
  if (exploding)
    return (
      <Explosion
        style={{
          position: "absolute",
          transform: `translate(-50px, -50px) scale(${
            type === "torpedo" ? 0.5 : size
          })`
        }}
      />
    );

  return (
    <>
      {id === targeted && (
        <img
          draggable="false"
          className="reticule"
          src={require("./reticle.svg")}
          alt="reticule"
        />
      )}
      {type === "torpedo" ? (
        <div
          className={`enemy-inner ${type === "enemy" ? "is-enemy" : ""}`}
          style={{
            width: "5px",
            height: "5px",
            backgroundColor: "white"
          }}
        />
      ) : (
        <div
          className={`enemy-inner ${type === "enemy" ? "is-enemy" : ""}`}
          style={{
            backgroundImage: `url('/assets${icon}')`
          }}
          onClick={() => type !== "torpedo" && setTargeted(id)}
        />
      )}
    </>
  );
};

export default FighterDisplay;
