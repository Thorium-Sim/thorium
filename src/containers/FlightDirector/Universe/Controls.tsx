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

function hexToRgb(bigint: number) {
  let r = ((bigint >> 16) & 255).toString(16);
  if (r.length === 1) r = `0${r}`;
  let g = ((bigint >> 8) & 255).toString(16);
  if (g.length === 1) g = `0${g}`;
  let b = (bigint & 255).toString(16);
  if (b.length === 1) b = `0${b}`;

  return `#${r}${g}${b}`;
}
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
  selectedEntity: any;
}) => {
  const [paletteExpanded, setPaletteExpanded] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!hasSelected) setPaletteExpanded(false);
  }, [hasSelected]);
  return (
    <div className={`controls-section ${paletteExpanded ? "expanded" : ""}`}>
      <div className="control-palette">
        <h2>Property Palette</h2>
        {selectedEntity && (
          <>
            <label>
              Name
              <input
                type="text"
                value={selectedEntity.name || ""}
                onChange={e => {
                  // TODO: Update so it triggers a mutation
                  // modifyEntity({
                  //   ...selectedEntity,
                  //   name: e.target.value,
                  // });
                }}
              />
            </label>
            <label>
              Scale
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={selectedEntity.scale || 1}
                onChange={e => {
                  // TODO: Update so it triggers a mutation
                  // modifyEntity({
                  //   ...selectedEntity,
                  //   scale: parseFloat(e.target.value),
                  // });
                }}
              />
            </label>
            <label>
              Color
              <input
                type="color"
                value={hexToRgb(selectedEntity.color)}
                onChange={e => {
                  // TODO: Update so it triggers a mutation
                  // modifyEntity({
                  //   ...selectedEntity,
                  //   color: parseInt(e.target.value.replace("#", ""), 16),
                  // });
                }}
              />
            </label>
          </>
        )}
      </div>
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
