import React, { PureComponent } from "react";
import { Asset } from "helpers/assets";

class Movie extends PureComponent {
  state = { error: false };
  render() {
    const { movie } = this.props;
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
          {({ src }) =>
            this.state.error ? (
              <img
                src={src}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain"
                }}
                alt="movie"
              />
            ) : (
              <video
                onError={() => this.setState({ error: true })}
                muted
                src={src}
                style={{
                  height: "100%",
                  width: "100%"
                }}
                autoPlay
                loop
                controls={false}
              />
            )
          }
        </Asset>
      </div>
    );
  }
}
export default Movie;
