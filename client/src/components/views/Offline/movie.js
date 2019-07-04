import React from "react";

const Movie = ({ movie }) => {
  const [error, setError] = React.useState(false);
  React.useEffect(() => setError(false), [movie]);
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
      {error ? (
        <img
          src={`/assets${movie}`}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain"
          }}
          alt="movie"
        />
      ) : (
        <video
          onError={() => setError(true)}
          muted
          src={`/assets${movie}`}
          style={{
            height: "100%",
            width: "100%"
          }}
          autoPlay
          loop
          controls={false}
        />
      )}
    </div>
  );
};
export default Movie;
