import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  CSSProperties,
} from "react";
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
        if (isPlayingRef.current) {
          media.play();
        }
      }}
      onChange={(e: any) => {
        setSeekValue(+e.target.value);
      }}
      className={className}
      style={{
        backgroundSize: (seekValue * 100) / (media.duration || 1) + "% 100%",
      }}
    />
  );
};
const SeekBar = withMediaProps(SeekBarComp);

interface AdvancedTrainingMediaViewerProps {
  src: string;
  onClose: () => void;
  onVideoEnd?: () => void;
  size?: "small" | "medium" | "large";
  position?: string;
  stripPosition?: "top" | "bottom";
}

const SIZE_WIDTHS = {small: 0.25, medium: 0.4, large: 0.6};
const STRIP_HEIGHT = 64;
const MARGIN = 16;

// Return CSS properties that accurately position the viewer using browser layout
// rather than guessing the element height in JavaScript.
function getPositionStyle(
  position: string,
  size: "small" | "medium" | "large",
  stripPosition: "top" | "bottom" = "bottom",
): CSSProperties {
  const [vert, horiz] = position.split("-");

  const style: CSSProperties = {};

  if (horiz === "left") {
    style.left = MARGIN;
  } else if (horiz === "right") {
    style.right = MARGIN;
  } else {
    style.left = "50%";
  } // center

  if (vert === "top") {
    style.top = stripPosition === "top" ? STRIP_HEIGHT + MARGIN : MARGIN;
  } else if (vert === "bottom") {
    style.bottom = stripPosition === "bottom" ? STRIP_HEIGHT + MARGIN : MARGIN;
  } else {
    style.top = "50%";
  } // middle

  const tx = horiz === "center" ? "-50%" : "0px";
  const ty = vert === "middle" ? "-50%" : "0px";
  if (tx !== "0px" || ty !== "0px") {
    style.transform = `translate(${tx}, ${ty})`;
  }

  // Width is still set via viewerWidth in the component
  return style;
}

const VIDEO_EXTENSIONS = ["mov", "mp4", "ogv", "webm", "m4v"];

const AdvancedTrainingMediaViewer: React.FC<
  AdvancedTrainingMediaViewerProps
> = ({
  src,
  onClose,
  onVideoEnd,
  size = "small",
  position = "bottom-right",
  stripPosition = "bottom",
}) => {
  // `dragPos` is only set once the user starts dragging. Before that, CSS
  // handles placement accurately (no hardcoded height guessing needed).
  const [dragPos, setDragPos] = useState<{x: number; y: number} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({x: 0, y: 0, posX: 0, posY: 0});
  const viewerRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const videoEndFiredRef = useRef(false);
  // Keep a stable ref to onVideoEnd so the ended-listener effect never needs
  // to re-run (and never detaches mid-playback) just because the prop's
  // function identity changed due to a parent re-render.
  const onVideoEndRef = useRef(onVideoEnd);
  useEffect(() => {
    onVideoEndRef.current = onVideoEnd;
  });

  const ext = (src.match(/\.([^.]+)$/)?.[1] || "").toLowerCase();
  const isVideo = VIDEO_EXTENSIONS.includes(ext);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (
        [
          "INPUT",
          "BUTTON",
          "SVG",
          "CIRCLE",
          "POLYGON",
          "RECT",
          "PATH",
          "G",
        ].includes(tag)
      ) {
        return;
      }

      // On first drag, capture the element's current pixel position so we can
      // switch from CSS-based layout to transform-based drag coordinates.
      let startPosX = dragPos?.x ?? 0;
      let startPosY = dragPos?.y ?? 0;
      if (!dragPos && viewerRef.current) {
        const rect = viewerRef.current.getBoundingClientRect();
        startPosX = rect.left;
        startPosY = rect.top;
        setDragPos({x: startPosX, y: startPosY});
      }

      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        posX: startPosX,
        posY: startPosY,
      };
    },
    [dragPos],
  );

  // Fire onVideoEnd once when the media element's ended event fires.
  // Works for both video and audio assets.
  //
  // Intentionally uses [] deps — the viewer is keyed on activeChapterId so it
  // remounts on chapter change. Within a chapter this effect must never re-run,
  // because tearing down and re-attaching the listener opens a window where the
  // ended event can be missed. onVideoEndRef keeps the callback current without
  // causing a re-run.
  useEffect(() => {
    const wrapper = playerWrapperRef.current;
    if (!wrapper) {
      return;
    }

    const attachListener = () => {
      const mediaEl = wrapper.querySelector("video, audio");
      if (!mediaEl) {
        return;
      }
      const handleEnded = () => {
        if (!videoEndFiredRef.current) {
          videoEndFiredRef.current = true;
          onVideoEndRef.current?.();
        }
      };
      mediaEl.addEventListener("ended", handleEnded);
      return () => mediaEl.removeEventListener("ended", handleEnded);
    };

    // The media element may not exist immediately; poll briefly
    let cleanup: (() => void) | undefined;
    const timer = setTimeout(() => {
      cleanup = attachListener();
    }, 200);

    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setDragPos({
        x: Math.max(
          0,
          Math.min(
            window.innerWidth * (1 - (SIZE_WIDTHS[size] || 0.25)),
            dragStartRef.current.posX + dx,
          ),
        ),
        y: Math.max(
          0,
          Math.min(window.innerHeight * 0.75, dragStartRef.current.posY + dy),
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

  // Before the user drags: let CSS handle placement precisely.
  // After dragging: switch to pixel-based transform coordinates.
  const positionStyle: CSSProperties = dragPos
    ? {
        left: 0,
        top: 0,
        right: "auto",
        bottom: "auto",
        transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
      }
    : getPositionStyle(position, size, stripPosition);

  return (
    <div
      ref={viewerRef}
      className="advanced-training-media-viewer"
      style={{
        ...positionStyle,
        width: viewerWidth,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="media-viewer-header">
        <span className="media-viewer-title">Training Media</span>
        <button className="media-viewer-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
      <Media>
        {({playPause}: {playPause: () => void}) => (
          <div className="media-viewer-body">
            <div
              ref={playerWrapperRef}
              className="media-viewer-player"
              style={
                isVideo
                  ? {display: "block"}
                  : {
                      position: "absolute",
                      width: 0,
                      height: 0,
                      overflow: "hidden",
                    }
              }
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
