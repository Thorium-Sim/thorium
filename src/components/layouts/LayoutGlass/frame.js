import React, { Fragment } from "react";

function videoColor(al) {
  if (al === "5") {
    return "blue";
  } else if (al === "4") {
    return "green";
  } else if (al === "3") {
    return "yellow";
  } else if (al === "2") {
    return "orange";
  } else if (al === "1") {
    return "red";
  }
  return "blue";
}
export default ({ simulator, lite, viewscreen }) => {
  const al = simulator.alertlevel;
  const video = videoColor(al);
  return (
    <div>
      {!lite && (
        <Fragment>
          <link rel="preload" href={require("./blue.mp4")} as="video" />
          <link rel="preload" href={require("./green.mp4")} as="video" />
          <link rel="preload" href={require("./yellow.mp4")} as="video" />
          <link rel="preload" href={require("./orange.mp4")} as="video" />
          <link rel="preload" href={require("./red.mp4")} as="video" />
        </Fragment>
      )}

      <div className="simName-graphic" />
      {!viewscreen && <div className="cards-graphic" />}
      <div className="stationName-graphic" />
      <div className="widgets-graphic" />
      {!viewscreen && <div className="username-graphic" />}
      <div
        className="color-image"
        style={{ backgroundImage: `url(${require(`./${video}.jpg`)})` }}
      />
      {!lite && (
        <video
          id="frame-bg"
          muted
          autoPlay
          loop
          src={require(`./${video}.mp4`)}
        />
      )}
    </div>
  );
};
