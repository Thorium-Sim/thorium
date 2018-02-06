import React from "react";

function videoColor(al) {
  if (al === "5") {
    return "blue";
  } else if (al === "4") {
    return "green";
  } else if (al === "3") {
    return "orange";
  } else if (al === "2") {
    return "yellow";
  } else if (al === "1") {
    return "red";
  }
  return "blue";
}
export default ({ simulator }) => {
  const al = simulator.alertlevel;
  const video = videoColor(al);
  return (
    <div>
      <link rel="preload" href={require("./blue.mp4")} as="video" />
      <link rel="preload" href={require("./green.mp4")} as="video" />
      <link rel="preload" href={require("./yellow.mp4")} as="video" />
      <link rel="preload" href={require("./orange.mp4")} as="video" />
      <link rel="preload" href={require("./red.mp4")} as="video" />

      <div className="simName-graphic" />
      <div className="cards-graphic" />
      <div className="stationName-graphic" />
      <div className="widgets-graphic" />
      <div className="username-graphic" />
      <video autoPlay loop src={require(`./${video}.mp4`)} />
    </div>
  );
};
