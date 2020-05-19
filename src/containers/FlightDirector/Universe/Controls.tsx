import * as React from "react";
import {
  MdSelectAll,
  MdCenterFocusStrong,
  MdZoomOutMap,
  MdLightbulbOutline,
  MdCamera,
} from "react-icons/md";
import {Tooltip} from "reactstrap";
import uuid from "uuid";
import {FaRuler} from "react-icons/fa";
import {CanvasContext} from "./CanvasContext";

interface TooltipButtonProps {
  tooltipContent: React.ReactNode;
  [key: string]: any;
}
const TooltipButton: React.FC<TooltipButtonProps> = ({
  children,
  tooltipContent,
  ...props
}) => {
  const tooltipId = React.useRef("A" + uuid.v4().split("-").join(""));
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <button id={tooltipId.current} {...props}>
        {children}
      </button>
      <Tooltip
        placement="right"
        isOpen={tooltipOpen}
        target={`#${tooltipId.current}`}
        toggle={toggle}
      >
        {tooltipContent}
      </Tooltip>
    </>
  );
};
type StateArg = (s: boolean) => boolean;

const Controls = () => {
  const [
    {
      zoomScale,
      selecting,
      lighting,
      camera,
      measuring,
      measured,
      speed,
      timeInSeconds,
    },
    dispatch,
  ] = React.useContext(CanvasContext);
  return (
    <div className={`controls-section`}>
      <div className="view-controls">
        <div>
          <TooltipButton
            onClick={() => dispatch({type: "recenter"})}
            tooltipContent="Recenter Canvas"
          >
            <MdCenterFocusStrong />
          </TooltipButton>
          <TooltipButton
            className={zoomScale ? "selected" : ""}
            onClick={() => dispatch({type: "zoomScale", tf: !zoomScale})}
            tooltipContent="Scale Objects with Zoom"
          >
            <MdZoomOutMap />
          </TooltipButton>
          <TooltipButton
            className={selecting ? "selected" : ""}
            onClick={() => dispatch({type: "selecting", tf: !selecting})}
            tooltipContent="Drag to Select"
          >
            <MdSelectAll />
          </TooltipButton>
          <TooltipButton
            className={lighting ? "selected" : ""}
            onClick={() => dispatch({type: "lighting", tf: !lighting})}
            tooltipContent="Use Scene Lighting"
          >
            <MdLightbulbOutline />
          </TooltipButton>
          <TooltipButton
            className={camera ? "selected" : ""}
            onClick={() => dispatch({type: "camera", tf: !camera})}
            tooltipContent="Use Simulation Camera"
          >
            <MdCamera />
          </TooltipButton>
          <TooltipButton
            className={`${measuring ? "active" : ""} ${
              measured ? "selected" : ""
            }`}
            onClick={() => dispatch({type: "measure"})}
            tooltipContent="Measure with engine speed"
          >
            <FaRuler />
          </TooltipButton>
        </div>
      </div>
      <div className="specific-controls">
        {measuring ? (
          <>
            <select
              value={speed}
              onChange={e =>
                dispatch({type: "speed", speed: parseFloat(e.target.value)})
              }
            >
              <option value={28}>1/4 Impulse</option>
              <option value={344}>1/2 Impulse</option>
              <option value={3913}>3/4 Impulse</option>
              <option value={44224}>Full Impulse</option>
              <option value={499497}>Destructive Impulse</option>
              <hr />
              <option>Warp 1</option>
            </select>
            <div>
              <input
                type="range"
                min={60}
                max={600}
                step={15}
                value={timeInSeconds}
                onChange={e =>
                  dispatch({
                    type: "time",
                    timeInSeconds: parseFloat(e.target.value),
                  })
                }
              />
              <p>
                {Math.trunc(timeInSeconds / 60)} Min
                {timeInSeconds % 60 > 0 ? `, ${timeInSeconds % 60} Sec` : ""}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Controls;
