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

export default ({simulator, lite, viewscreen}) => {
  const al = simulator.alertlevel;
  const video = videoColor(al);
  console.log("image", generateBackgroundImage(al));
  return (
    <div>
      {!lite && (
        <Fragment>
          <link rel="preload" href={BlueVideo} as="video" />
          <link rel="preload" href={GreenVideo} as="video" />
          <link rel="preload" href={YellowVideo} as="video" />
          <link rel="preload" href={OrangeVideo} as="video" />
          <link rel="preload" href={RedVideo} as="video" />
        </Fragment>
      )}

      <div className="simName-graphic" />
      {!viewscreen && <div className="cards-graphic" />}
      <div className="stationName-graphic" />
      <div className="widgets-graphic" />
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
};
