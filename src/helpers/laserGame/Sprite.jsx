import React from "react";
import Obstacle from "./images/Obstacle.svg";
import Mirror from "./images/Mirror.svg";
import FilterRed from "./images/FilterRed.svg";
import FilterBlue from "./images/FilterBlue.svg";
import FilterGreen from "./images/FilterGreen.svg";
import EmitterRed from "./images/EmitterRed.svg";
import EmitterBlue from "./images/EmitterBlue.svg";
import EmitterGreen from "./images/EmitterGreen.svg";
import Checkpoint from "./images/Checkpoint.svg";
import CheckpointOn from "./images/Checkpoint-On.svg";


export function getSprite(name, active) {
  if (!name) return {};
  name = name.replace("-Locked", "");
  if (name === "Obstacle") {
    return {src: Obstacle};
  }
  if (name.includes("Mirror")) {
    return {
      src: Mirror,
      className: `${name.replace("Mirror", "rotate-")}`,
    };
  }
  if (name.includes("FilterRed")) {
    return {src: FilterRed};
  }
  if (name.includes("FilterBlue")) {
    return {src: FilterBlue};
  }
  if (name.includes("FilterGreen")) {
    return {src: FilterGreen};
  }
  if (name.includes("EmitterRed")) {
    return {src: EmitterRed};
  }
  if (name.includes("EmitterBlue")) {
    return {src: EmitterBlue};
  }
  if (name.includes("EmitterGreen")) {
    return {src: EmitterGreen};
  }
  if (name.includes("CheckPoint")) {
    if (active) {
      return {src: CheckpointOn};
    }
    return {src: Checkpoint};
  }
  return {};
}
const Sprite = ({name, side, active, onMouseDown}) => {
  let {src, className = ""} = getSprite(name, active);
  const locked =
    name.includes("-Locked") ||
    name.includes("Obstacle") ||
    name.includes("CheckPoint");
  return (
    <div
      onMouseDown={locked ? null : onMouseDown}
      className={`${locked ? "locked" : ""} sprite ${
        name.includes("Emitter") ? side : ""
      } ${name.replace("-Locked", "")} ${
        name.includes("Mirror") ? "Mirror" : ""
      } ${className}`}
      style={{
        "--scale": src ? 1 : 0,
        backgroundImage: `url('${src}')`,
      }}
    />
  );
};

export default Sprite;
