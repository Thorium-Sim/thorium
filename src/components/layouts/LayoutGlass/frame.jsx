import React, {Fragment} from "react";
import BlueImage from "./blue.jpg";
import GreenImage from "./green.jpg";
import YellowImage from "./yellow.jpg";
import OrangeImage from "./orange.jpg";
import RedImage from "./red.jpg";
import PurpleImage from "./purple.jpg";
import BlueVideo from "./blue.mp4";
import GreenVideo from "./green.mp4";
import YellowVideo from "./yellow.mp4";
import OrangeVideo from "./orange.mp4";
import RedVideo from "./red.mp4";
import PurpleVideo from "./purple.mp4";

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

function generateBackgroundVideo(al) {
  if (al === "5") {
    return BlueVideo;
  } else if (al === "4") {
    return GreenVideo;
  } else if (al === "3") {
    return YellowVideo;
  } else if (al === "2") {
    return OrangeVideo;
  } else if (al === "1") {
    return RedVideo;
  } else if (al === "p") {
    return PurpleVideo;
  }
  return BlueVideo;
}

function generateBackgroundImage(al) {
  if (al === "5") {
    return BlueImage;
  } else if (al === "4") {
    return GreenImage;
  } else if (al === "3") {
    return YellowImage;
  } else if (al === "2") {
    return OrangeImage;
  } else if (al === "1") {
    return RedImage;
  } else if (al === "p") {
    return PurpleImage;
  }
  return BlueImage;
}

export default function Layoutlass({
  simulator,
  lite,
  viewscreen,
  clientObj,
  station,
  children,
}) {
  const al = simulator.alertlevel;
  return (
    <div>
      {viewscreen && (
        <React.Fragment>
          <div
            style={{
              position: "relative",
              zIndex: !clientObj?.overlay ? 1000 : 1,
            }}
          >
            {children}
          </div>
          <div className="frame-text">
            <h1 className="simulator-name" style={{zIndex: 11}}>
              {simulator.name}
            </h1>
            <h2 className="station-name" style={{zIndex: 11}}>
              {station.name}
            </h2>
          </div>
        </React.Fragment>
      )}
      {!lite && (
        <Fragment>
          <link rel="preload" href={BlueVideo} as="video" />
          <link rel="preload" href={GreenVideo} as="video" />
          <link rel="preload" href={YellowVideo} as="video" />
          <link rel="preload" href={OrangeVideo} as="video" />
          <link rel="preload" href={RedVideo} as="video" />
        </Fragment>
      )}

      <div
        className="simName-graphic"
        style={viewscreen ? {zIndex: 10} : undefined}
      />
      {!viewscreen && <div className="cards-graphic" />}
      <div
        className="stationName-graphic"
        style={viewscreen ? {zIndex: 10} : undefined}
      />
      <div
        className="widgets-graphic"
        style={viewscreen ? {zIndex: 10} : undefined}
      />
      {!viewscreen && <div className="username-graphic" />}
      <div
        className="color-image"
        style={{backgroundImage: `url('${generateBackgroundImage(al)}')`}}
      />
      {!lite && (
        <video
          id="frame-bg"
          muted
          autoPlay
          loop
          src={generateBackgroundVideo(al)}
        />
      )}
    </div>
  );
}
