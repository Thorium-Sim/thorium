import React, {useRef, useState, useEffect, useCallback} from "react";
// @ts-ignore - react-media-player has no type declarations
import {Media, Player, controls, withMediaProps} from "react-media-player";
import "./AdvancedTrainingMediaViewer.scss";

const {CurrentTime, Duration, Volume} = controls;

// Reuse the same withMediaProps pattern from the legacy training player
const PlayPauseComp: React.FC<{media: any; className?: string}> = ({
  media,
  className,
}) => (
  <svg
    role="button"
    width="30px"
    height="30px"
    viewBox="0 0 36 36"
    className={className}
    onClick={() => media.playPause()}
  >
    <circle fill="#373D3F" cx="18" cy="18" r="18" />
    {media.isPlaying ? (
      <g key="pause">
        <rect x="12" y="11" fill="#CDD7DB" width="4" height="14" />
        <rect x="20" y="11" fill="#CDD7DB" width="4" height="14" />
      </g>
    ) : (
      <polygon key="play" fill="#CDD7DB" points="14,11 26,18 14,25" />
    )}
  </svg>
);
const PlayPause = withMediaProps(PlayPauseComp);

const MuteUnmuteComp: React.FC<{media: any; className?: string}> = ({
  media,
  className,
}) => (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 36 36"
    className={className}
    onClick={() => media.muteUnmute()}
  >
    <circle fill="#373D3F" cx="18" cy="18" r="18" />
    <polygon
      fill="#CDD7DB"
      points="11,14.844 11,21.442 14.202,21.442 17.656,25 17.656,11 14.074,14.844"
    />
    {media.volume > 0 && !media.isMuted && (
      <path
        fill="#CDD7DB"
        d="M21.733,18c0-1.518-0.91-2.819-2.211-3.402v6.804C20.824,20.818,21.733,19.518,21.733,18z"
      />
    )}
    {(media.volume === 0 || media.isMuted) && (
      <polygon
        fill="#CDD7DB"
        points="24.839,15.955 23.778,14.895 21.733,16.94 19.688,14.895 18.628,15.955 20.673,18 18.628,20.045 19.688,21.106 21.733,19.061 23.778,21.106 24.839,20.045 22.794,18"
      />
    )}
  </svg>
);
const MuteUnmute = withMediaProps(MuteUnmuteComp);

const SeekBarComp: React.FC<{media: any; className?: string}> = ({
  media,
  className,
}) => {
  const [seekValue, setSeekValue] = useState(media.currentTime);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    setSeekValue(media.currentTime);
  }, [media.currentTime]);

  return (
    <input
      type="range"
      step="any"
      max={media.duration.toFixed(4)}
      value={seekValue}
      onMouseDown={() => {
        isPlayingRef.current = media.isPlaying;
        media.pause();
      }}
      onMouseUp={(e: any) => {
        media.seekTo(+e.target.value);
        if (isPlayingRef.current) media.play();
      }}
      onChange={(e: any) => {
        setSeekValue(+e.target.value);
      }}
      className={className}
      style={{
        backgroundSize:
          (seekValue * 100) / (media.duration || 1) + "% 100%",
      }}
    />
  );
};
const SeekBar = withMediaProps(SeekBarComp);

interface AdvancedTrainingMediaViewerProps {
  src: string;
  onClose: () => void;
  size?: "small" | "medium" | "large";
  position?: string;
}

const SIZE_WIDTHS = {small: 0.25, medium: 0.40, large: 0.60};

function computeInitialPosition(
  position: string,
  size: "small" | "medium" | "large",
): {x: number; y: number} {
  const viewerW = window.innerWidth * (SIZE_WIDTHS[size] || 0.25);
  const viewerH = 280;
  const margin = 16;
  const contentH = window.innerHeight - 36;
  const contentW = window.innerWidth;

  const [vert, horiz] = position.split("-");

  let x: number;
  if (horiz === "left") x = margin;
  else if (horiz === "right") x = contentW - viewerW - margin;
  else x = (contentW - viewerW) / 2;

  let y: number;
  if (vert === "top") y = margin;
  else if (vert === "bottom") y = contentH - viewerH - margin;
  else y = (contentH - viewerH) / 2;

  return {x: Math.max(0, x), y: Math.max(0, y)};
}

const VIDEO_EXTENSIONS = ["mov", "mp4", "ogv", "webm", "m4v"];

const AdvancedTrainingMediaViewer: React.FC<
  AdvancedTrainingMediaViewerProps
> = ({src, onClose, size = "small", position = "bottom-right"}) => {
  const [pos, setPos] = useState(() => computeInitialPosition(position, size));
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({x: 0, y: 0, posX: 0, posY: 0});

  const ext = (src.match(/\.([^.]+)$/)?.[1] || "").toLowerCase();
  const isVideo = VIDEO_EXTENSIONS.includes(ext);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Don't drag on interactive elements
      const tag = (e.target as HTMLElement).tagName;
      if (["INPUT", "BUTTON", "SVG", "CIRCLE", "POLYGON", "RECT", "PATH", "G"].includes(tag)) return;

      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        posX: pos.x,
        posY: pos.y,
      };
    },
    [pos],
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPos({
        x: Math.max(
          0,
          Math.min(
            window.innerWidth * 0.75,
            dragStartRef.current.posX + dx,
          ),
        ),
        y: Math.max(
          0,
          Math.min(
            window.innerHeight * 0.75,
            dragStartRef.current.posY + dy,
          ),
        ),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const viewerWidth = `${(SIZE_WIDTHS[size] || 0.25) * 100}vw`;

  return (
    <div
      className="advanced-training-media-viewer"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        width: viewerWidth,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="media-viewer-header">
        <span className="media-viewer-title">Training Media</span>
        <button className="media-viewer-close" onClick={onClose}>
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="currentColor"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
      <Media>
        {({playPause}: {playPause: () => void}) => (
          <div className="media-viewer-body">
            <div
              className="media-viewer-player"
              style={{display: isVideo ? "block" : "none"}}
            >
              <Player src={src} onClick={() => playPause()} />
            </div>
            <div className="media-viewer-controls">
              <PlayPause className="media-control media-control--play-pause" />
              <CurrentTime className="media-control media-control--current-time" />
              <SeekBar className="media-control media-control--volume-range" />
              <Duration className="media-control media-control--duration" />
              <MuteUnmute className="media-control media-control--mute-unmute" />
              <Volume className="media-control media-control--volume" />
            </div>
          </div>
        )}
      </Media>
    </div>
  );
};

export default AdvancedTrainingMediaViewer;
