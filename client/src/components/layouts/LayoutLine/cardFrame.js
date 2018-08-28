import React, { Component } from "react";
import Measure from "react-measure";

function calculateOffset(number, dimension) {
  if (number < dimension / 2) return number + 2;
  return number - 2;
}
function calculatePath(
  { width, height },
  bottomLength,
  topLength,
  cardLength = 0
) {
  const offset = 50;
  const values = [
    [0, offset],
    [0, height - offset],
    [bottomLength * 40, height - offset],
    [bottomLength * 40 + offset, height],
    [width - offset, height],
    [width, height - offset],
    [width, offset],
    [width - topLength * 32, offset],
    [width - topLength * 32 - offset, 0],
    [cardLength * 32 + offset, 0],
    [cardLength * 32, offset],
    [0, offset]
  ];
  return `polygon(${values.map(v => `${v[0]}px ${v[1]}px`).join(",")}
  ,${values
    .reverse()
    .map(
      v =>
        `${calculateOffset(v[0], width)}px ${calculateOffset(v[1], height)}px`
    )})`;
}

class CardFrame extends Component {
  state = {};
  render() {
    let {
      simulator,
      station,
      children,
      cardName = "",
      viewscreen,
      clientObj
    } = this.props;
    const { dimensions } = this.state;
    const { name: stationName = "" } = station;
    return (
      <div className="card-frame">
        <h1 className="simulator-name">{simulator.name}</h1>
        <h2 className="station-name">{stationName}</h2>
        <h2 className="card-name">{cardName}</h2>
        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ dimensions: contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <div className="frame-container" ref={measureRef}>
              {dimensions && (
                <div
                  className="frame-outer"
                  style={{
                    clipPath: calculatePath(
                      dimensions,
                      simulator.name.length,
                      stationName.length,
                      cardName.length
                    )
                  }}
                />
              )}
            </div>
          )}
        </Measure>
        <div
          className="card-area"
          style={{ zIndex: viewscreen && !clientObj.overlay ? 1000 : 1 }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default CardFrame;
