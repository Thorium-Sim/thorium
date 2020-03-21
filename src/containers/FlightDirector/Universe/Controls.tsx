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

interface TooltipButtonProps {
  tooltipContent: React.ReactNode;
  [key: string]: any;
}
const TooltipButton: React.FC<TooltipButtonProps> = ({
  children,
  tooltipContent,
  ...props
}) => {
  const tooltipId = React.useRef(
    "A" +
      uuid
        .v4()
        .split("-")
        .join(""),
  );
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

const Controls = ({
  recenter,
  zoomScale,
  setZoomScale,
  selecting,
  setSelecting,
  hasSelected,
  lighting,
  setLighting,
  camera,
  setCamera,
}: {
  recenter: () => void;
  zoomScale: boolean;
  setZoomScale: (val: boolean | StateArg) => void;
  selecting: boolean;
  setSelecting: (val: boolean | StateArg) => void;
  hasSelected: boolean;
  lighting: boolean;
  setLighting: React.Dispatch<React.SetStateAction<boolean>>;
  camera: boolean;
  setCamera: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={`controls-section`}>
      <div className="view-controls">
        <div>
          <TooltipButton onClick={recenter} tooltipContent="Recenter Canvas">
            <MdCenterFocusStrong />
          </TooltipButton>
          <TooltipButton
            className={zoomScale ? "selected" : ""}
            onClick={() => setZoomScale((s: boolean) => !s)}
            tooltipContent="Scale Objects with Zoom"
          >
            <MdZoomOutMap />
          </TooltipButton>
          <TooltipButton
            className={selecting ? "selected" : ""}
            onClick={() => setSelecting((s: boolean) => !s)}
            tooltipContent="Drag to Select"
          >
            <MdSelectAll />
          </TooltipButton>
          <TooltipButton
            className={lighting ? "selected" : ""}
            onClick={() => setLighting((s: boolean) => !s)}
            tooltipContent="Use Scene Lighting"
          >
            <MdLightbulbOutline />
          </TooltipButton>
          <TooltipButton
            className={camera ? "selected" : ""}
            onClick={() => setCamera((s: boolean) => !s)}
            tooltipContent="Use Simulation Camera"
          >
            <MdCamera />
          </TooltipButton>
        </div>
      </div>
    </div>
  );
};

export default Controls;
