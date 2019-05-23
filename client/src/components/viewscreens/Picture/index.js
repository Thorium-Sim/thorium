import React from "react";
import "./style.scss";

const VideoConfig = ({ viewscreen }) => {
  const data = JSON.parse(viewscreen.data);

  return (
    <div className={`viewscreen-video ${data.overlay ? "overlay" : ""}`}>
      <img
        src={`/assets${data.asset ||
          "/Viewscreen/Tactical Backgrounds/Stars.png"}`}
        alt="viewscreen"
      />
    </div>
  );
};

export default VideoConfig;
