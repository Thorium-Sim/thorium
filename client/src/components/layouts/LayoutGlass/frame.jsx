import React, {Fragment} from "react";
import blue from "./blue.mp4";
import green from "./green.mp4";
import yellow from "./yellow.mp4";
import orange from "./orange.mp4";
import red from "./red.mp4";
import blueJpg from "./blue.jpg";
import greenJpg from "./green.jpg";
import yellowJpg from "./yellow.jpg";
import orangeJpg from "./orange.jpg";
import redJpg from "./red.jpg";

const videos = {
  blue,
  green,
  yellow,
  orange,
  red,
};

const images = {
  blue: blueJpg,
  green: greenJpg,
  yellow: yellowJpg,
  orange: orangeJpg,
  red: redJpg,
};
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
  } else if (al === "p") {
    return "purple";
  }
  return "blue";
}
export default ({simulator, lite, viewscreen}) => {
  const al = simulator.alertlevel;
  const video = videoColor(al);
  return (
    <div>
      {!lite && (
        <Fragment>
          <link rel="preload" href={blue} as="video" />
          <link rel="preload" href={green} as="video" />
          <link rel="preload" href={yellow} as="video" />
          <link rel="preload" href={orange} as="video" />
          <link rel="preload" href={red} as="video" />
        </Fragment>
      )}

      <div className="simName-graphic" />
      {!viewscreen && <div className="cards-graphic" />}
      <div className="stationName-graphic" />
      <div className="widgets-graphic" />
      {!viewscreen && <div className="username-graphic" />}
      <div
        className="color-image"
        style={{backgroundImage: `url(${images[video]})`}}
      />
      {!lite && <video id="frame-bg" muted autoPlay loop src={videos[video]} />}
    </div>
  );
};
