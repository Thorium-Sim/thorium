import React, { Component } from "react";
import "./tourHelper.scss";
import { Media, Player, controls, withMediaProps } from "react-media-player";
import "./trainingPlayer.scss";
import Measure from "react-measure";
import FontAwesome from "react-fontawesome";
import { subscribe } from "helpers/pubsub";

const { CurrentTime, SeekBar, Duration, Volume } = controls;

class MuteUnmuteComp extends Component {
  _handleMuteUnmute = () => {
    this.props.media.muteUnmute();
  };

  render() {
    const {
      media: { isMuted, volume },
      className
    } = this.props;
    return (
      <svg
        width="36px"
        height="36px"
        viewBox="0 0 36 36"
        className={className}
        onClick={this._handleMuteUnmute}
      >
        <circle fill="#373D3F" cx="18" cy="18" r="18" />
        <polygon
          fill="#CDD7DB"
          points="11,14.844 11,21.442 14.202,21.442 17.656,25 17.656,11 14.074,14.844"
        />
        {volume >= 0.5 && (
          <path
            key="first-bar"
            fill="#CDD7DB"
            d="M24.024,14.443c-0.607-1.028-1.441-1.807-2.236-2.326c-0.405-0.252-0.796-0.448-1.153-0.597c-0.362-0.139-0.682-0.245-0.954-0.305c-0.058-0.018-0.104-0.023-0.158-0.035v1.202c0.2,0.052,0.421,0.124,0.672,0.22c0.298,0.125,0.622,0.289,0.961,0.497c0.662,0.434,1.359,1.084,1.864,1.94c0.26,0.424,0.448,0.904,0.599,1.401c0.139,0.538,0.193,0.903,0.216,1.616c-0.017,0.421-0.075,1.029-0.216,1.506c-0.151,0.497-0.339,0.977-0.599,1.401c-0.505,0.856-1.202,1.507-1.864,1.94c-0.339,0.209-0.663,0.373-0.961,0.497c-0.268,0.102-0.489,0.174-0.672,0.221v1.201c0.054-0.012,0.1-0.018,0.158-0.035c0.272-0.06,0.592-0.166,0.954-0.305c0.358-0.149,0.748-0.346,1.153-0.597c0.795-0.519,1.629-1.298,2.236-2.326C24.639,20.534,24.994,19.273,25,18C24.994,16.727,24.639,15.466,24.024,14.443z"
          />
        )}
        {volume > 0 && (
          <path
            key="second-bar"
            fill="#CDD7DB"
            d="M21.733,18c0-1.518-0.91-2.819-2.211-3.402v6.804C20.824,20.818,21.733,19.518,21.733,18z"
          />
        )}

        {(volume === 0 || isMuted) && (
          <polygon
            key="mute"
            fill="#CDD7DB"
            points="24.839,15.955 23.778,14.895 21.733,16.94 19.688,14.895 18.628,15.955 20.673,18 18.628,20.045 19.688,21.106 21.733,19.061 23.778,21.106 24.839,20.045 22.794,18 "
          />
        )}
      </svg>
    );
  }
}

const MuteUnmute = withMediaProps(MuteUnmuteComp);
class PlayPauseComp extends Component {
  _handlePlayPause = () => {
    this.props.media.playPause();
  };

  render() {
    const {
      media: { isPlaying },
      className
    } = this.props;
    return (
      <svg
        role="button"
        width="36px"
        height="36px"
        viewBox="0 0 36 36"
        className={className}
        onClick={this._handlePlayPause}
      >
        <circle fill="#373D3F" cx="18" cy="18" r="18" />
        {isPlaying && (
          <g key="pause" style={{ transformOrigin: "0% 50%" }}>
            <rect x="12" y="11" fill="#CDD7DB" width="4" height="14" />
            <rect x="20" y="11" fill="#CDD7DB" width="4" height="14" />
          </g>
        )}
        {!isPlaying && (
          <polygon
            key="play"
            fill="#CDD7DB"
            points="14,11 26,18 14,25"
            style={{ transformOrigin: "100% 50%" }}
          />
        )}
      </svg>
    );
  }
}

const PlayPause = withMediaProps(PlayPauseComp);

const invalidTags = ["INPUT", "circle", "svg"];

class MediaPlayerObject extends Component {
  componentDidMount() {
    this.sub = subscribe("toggleTraining", () => {
      this.props.playPause();
    });
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  render() {
    const { isMovie, src, playPause, close } = this.props;
    return (
      <div className="media">
        <div
          className="media-player"
          style={{ display: isMovie ? "block" : "none" }}
        >
          <Player src={src} onClick={() => playPause()} />
        </div>
        <div className="media-controls">
          <PlayPause className="media-control media-control--play-pause" />
          <CurrentTime className="media-control media-control--current-time" />
          <SeekBar className="media-control media-control--volume-range" />
          <Duration className="media-control media-control--duration" />
          <MuteUnmute className="media-control media-control--mute-unmute" />
          <Volume className="media-control media-control--volume" />

          {close && <FontAwesome name="times-circle-o" onClick={close} />}
        </div>
      </div>
    );
  }
}
export default class MediaPlayer extends Component {
  state = {
    position: { x: 0, y: 0 }
  };
  mouseDown = evt => {
    if (invalidTags.indexOf(evt.target.tagName) > -1) return;

    this.setState(
      {
        initialPosition: evt.target.getBoundingClientRect()
      },
      () => {
        document.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("touchmove", this.touchMove);
        document.addEventListener("touchend", this.mouseUp);

        document.addEventListener("mouseup", this.mouseUp);
      }
    );
  };
  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("touchmove", this.touchMove);
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("touchend", this.mouseUp);
  };
  touchMove = evt => {
    const { clientX, clientY } = evt.touches[0];
    this.setState({
      position: {
        x:
          clientX -
          this.state.initialPosition.x -
          this.state.initialPosition.width / 2,
        y: clientY - this.state.initialPosition.y
      }
    });
  };
  mouseMove = evt => {
    this.setState({
      position: {
        x: Math.max(
          0,
          Math.min(
            window.innerWidth - this.state.dimensions.width,
            this.state.position.x + evt.movementX
          )
        ),
        y: Math.max(
          0,
          Math.min(
            window.innerHeight - this.state.dimensions.height,
            this.state.position.y + evt.movementY
          )
        )
      }
    });
  };
  setDimensions = contentRect => {
    // Set the position based on the dimensions
    let { position } = this.state;
    const { width } = contentRect.bounds;
    position = {
      x: position.x === 0 ? window.innerWidth / 2 - width / Math.E : position.x,
      y: position.y === 0 ? 100 : position.y
    };
    this.setState({ dimensions: contentRect.bounds, position });
  };
  render() {
    const { src = "/sciences.ogg", close } = this.props;
    const { position } = this.state;
    const ext1 = src.match(/\..*$/gi);
    const ext = ext1 ? ext1[0].replace(".", "").toLowerCase() : null;
    const isMovie = ["mov", "mp4", "ogv", "webm", "m4v"].indexOf(ext) > -1;
    return (
      <Measure bounds onResize={this.setDimensions}>
        {({ measureRef }) => (
          <div
            ref={measureRef}
            className="training-media-wrapper"
            onMouseDown={this.mouseDown}
            onTouchStart={this.mouseDown}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`
            }}
          >
            <Media>
              {({ isFullscreen, playPause }) => (
                <MediaPlayerObject
                  playPause={playPause}
                  isFullscreen={isFullscreen}
                  close={close}
                  isMovie={isMovie}
                  src={src}
                />
              )}
            </Media>
          </div>
        )}
      </Measure>
    );
  }
}
