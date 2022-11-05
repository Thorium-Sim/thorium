import React from "react";

export function getSprite(name, active) {
  if (!name) return {};
  name = name.replace("-Locked", "");
  if (name === "Obstacle") {
    return {src: require("./images/Obstacle.svg")};
  }
  if (name.includes("Mirror")) {
    return {
      src: require("./images/Mirror.svg"),
      className: `${name.replace("Mirror", "rotate-")}`,
    };
  }
  if (name.includes("FilterRed")) {
    return {src: require("./images/FilterRed.svg")};
  }
  if (name.includes("FilterBlue")) {
    return {src: require("./images/FilterBlue.svg")};
  }
  if (name.includes("FilterGreen")) {
    return {src: require("./images/FilterGreen.svg")};
  }
  if (name.includes("EmitterRed")) {
    return {src: require("./images/EmitterRed.svg")};
  }
  if (name.includes("EmitterBlue")) {
    return {src: require("./images/EmitterBlue.svg")};
  }
  if (name.includes("EmitterGreen")) {
    return {src: require("./images/EmitterGreen.svg")};
  }
  if (name.includes("CheckPoint")) {
    if (active) {
      return {src: require("./images/Checkpoint-On.svg")};
    }
    return {src: require("./images/Checkpoint.svg")};
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
