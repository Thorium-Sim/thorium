import React from "react";
import { Asset } from "../../../helpers/assets";

const layerComps = {
  grid: ({ gridCols, gridRows, color, labels }) => {
    return (
      <div className="tactical-grid">
        <div className="cols">
          {Array(gridCols)
            .fill(0)
            .map((_, i) => (
              <div key={`grid-col-${i}`} style={{ backgroundColor: color }} />
            ))}
        </div>
        <div className="rows">
          {Array(gridRows)
            .fill(0)
            .map((_, i) => (
              <div key={`grid-row-${i}`} style={{ backgroundColor: color }} />
            ))}
        </div>
        {labels && (
          <div className="labels">
            <div className="label-cols">
              {Array(gridCols + 1)
                .fill(0)
                .map((_, i) => <div key={`grid-label-col-${i}`}>{i + 1}</div>)}
            </div>
            <div className="label-rows">
              {Array(gridRows + 1)
                .fill(0)
                .map((_, i) => (
                  <div key={`grid-label-row-${i}`}>
                    {String.fromCharCode(i + 65)}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  },
  image: ({ image }) => {
    return (
      <div className="tactical-image">
        <Asset asset={image}>
          {({ src }) => <img src={src} alt="Background" />}
        </Asset>
      </div>
    );
  },
  objects: ({ items }) => (
    <div className="tactical-objects">
      {items.map(i => (
        <Asset asset={i.icon} key={i.id}>
          {({ src }) => (
            <div
              className={"tactical-icon"}
              style={{
                transform: `translate(${i.location.x * 100}%, ${i.location.y *
                  100}%)`
              }}
            >
              <img draggable={false} src={src} />
            </div>
          )}
        </Asset>
      ))}
    </div>
  )
};
export default ({ layers }) => {
  return (
    <div className="tactical-map-view">
      {layers.map(l => {
        const Comp = layerComps[l.type];
        return (
          <div key={l.id} className="tactical-map-layer">
            <Comp {...l} />
          </div>
        );
      })}
    </div>
  );
};
