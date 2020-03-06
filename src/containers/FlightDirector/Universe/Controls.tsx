import * as React from "react";
import {
  MdSelectAll,
  MdCenterFocusStrong,
  MdZoomOutMap,
  MdChevronRight,
  MdChevronLeft,
} from "react-icons/md";
import {Tooltip} from "reactstrap";
import uuid from "uuid";
import PropertyPalette from "./PropertyPalette";
import {Entity} from "generated/graphql";

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
  selectedEntity,
}: {
  recenter: () => void;
  zoomScale: boolean;
  setZoomScale: (val: boolean | StateArg) => void;
  selecting: boolean;
  setSelecting: (val: boolean | StateArg) => void;
  hasSelected: boolean;
  selectedEntity: Entity | undefined;
}) => {
  const [paletteExpanded, setPaletteExpanded] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!hasSelected) setPaletteExpanded(false);
  }, [hasSelected]);
  return (
    <div className={`controls-section ${paletteExpanded ? "expanded" : ""}`}>
      <PropertyPalette selectedEntity={selectedEntity} />
      <div className="view-controls">
        <div>
          <TooltipButton
            disabled={!hasSelected}
            className={paletteExpanded ? "selected" : ""}
            onClick={() => setPaletteExpanded((s: boolean) => !s)}
            tooltipContent="Property Palette"
          >
            {paletteExpanded ? <MdChevronLeft /> : <MdChevronRight />}
          </TooltipButton>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default Controls;
