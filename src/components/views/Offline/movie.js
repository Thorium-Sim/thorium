import React from "react";
import { Asset } from "../../../helpers/assets";

const Movie = ({ movie }) => {
  console.log(movie);
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 100000000
      }}
    >
      <Asset asset={movie}>
        {({ src }) => (
          <video
            mute
            src={src}
            style={{
              height: "100%",
              width: "100%"
            }}
            autoPlay
            loop
            controls={false}
          />
        )}
      </Asset>
    </div>
  );
};
export default Movie;
