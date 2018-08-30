import React, { Fragment, Component } from "react";
import Measure from "react-measure";

function calculateOffset(number, dimension) {
  if (number < dimension / 2) return number + 2;
  return number - 2;
}
function darkPath(
  { width, height },
  bottomLength,
  topLength,
  cardLength = 0,
  widgets = 0
) {
  const offset = 75;
  const values = [
    [0, height - offset - 35],
    [0, height],
    [width, height],
    [width, height - offset - 35],
    [width - widgets * 60 - 60 + 35, height - offset - 35],
    [width - offset - widgets * 60 - 60, height - offset],
    [bottomLength * 45 + offset + 35, height - offset],
    [bottomLength * 45 + 35, height - offset - 35],
    [0, height - offset - 35],
    [0, 0],
    [width, 0],
    [width, offset],
    [width - topLength * 32, offset],
    [width + 10 - topLength * 32 - offset, offset - 20],
    [320 - offset, offset - 20],
    [320 - offset - 10, offset],
    [0, offset],
    [0, 0]
  ];
  return `polygon(${values.map(v => `${v[0]}px ${v[1]}px`).join(",")})`;
}
function calculateBody(
  { width, height },
  bottomLength,
  topLength,
  cardLength = 0,
  widgets = 0
) {
  const offset = 75;
  const values = [
    [0, 10],
    [400, 10],
    [320, offset - 30],
    [320 - offset - 5, offset - 30],
    [320 - offset - 5 - 10, offset - 10],
    [0, offset - 10],
    [0, offset - 20],
    [100, offset - 20],
    [100, offset - 30],
    [0, offset - 30],
    [0, offset - 40],
    [150, offset - 40],
    [150, offset - 50],
    [0, offset - 50],
    [0, 10],

    [420, 10],
    [width + 10 - topLength * 32 - 50, 10],
    [width + 10 - topLength * 32 - offset, offset - 30],
    [440 - offset - 5, offset - 30],
    [440, 10],
    [0, 10],

    [0, height - offset - 35 + 10],
    [bottomLength * 45 + 35, height - offset - 35 + 10],
    [bottomLength * 45 + offset + 35, height - offset + 10],
    [width - offset - widgets * 60 - 60, height - offset + 10],
    [width - widgets * 60 - 60 + 35, height - offset - 35 + 10],
    [width + 10, height - offset - 35 + 10],

    [width + 10, height - offset - 35 + 20],
    [width - widgets * 60 - 60 + 35, height - offset - 35 + 20],
    [width - offset - widgets * 60 - 60 - 70, height - 10],
    [bottomLength * 45 + offset + 35 + 20, height - 10],
    [bottomLength * 45 - 0, height - offset - 35 + 20],
    [0, height - offset - 35 + 20]
  ];
  return `polygon(${values.map(v => `${v[0]}px ${v[1]}px`).join(",")})`;
}
function calculatePath(
  { width, height },
  bottomLength,
  topLength,
  cardLength = 0,
  widgets = 0
) {
  const offset = 75;
  const values = [
    [-50, offset],
    [-50, height - offset - 35],
    [5, height - offset - 35],
    [5, height - offset + 10],
    [bottomLength * 45 - 10, height - offset + 10],
    [bottomLength * 45 + offset + 35, height - 5],
    [5, height - 5],
    [5, height - offset - 35],
    [0, height - offset - 35],
    [bottomLength * 45 + 35, height - offset - 35],
    [bottomLength * 45 + offset + 35, height - offset],
    [width - offset - widgets * 60 - 60, height - offset],
    [width - widgets * 60 - 60 + 35, height - offset - 35],
    [width + 10, height - offset - 35],

    [width + 10, height - offset],
    [width - 10, height - offset],
    [width - widgets * 60 - 60 + 25 + 10, height - offset],
    [width - offset - widgets * 60 - 60 - 35, height - 10],

    [width - 10, height - 10],

    [width - 10, height - offset],
    [width + 10, height - offset],

    [width + 10, offset],
    [width + 10 - topLength * 32, offset],
    [width + 10 - topLength * 32 - offset, offset - 20],
    [320 - offset, offset - 20],
    [320 - offset - 10, offset],
    [-50, offset]
  ];
  return `polygon(${values.map(v => `${v[0]}px ${v[1]}px`).join(",")}
  ,${values
    .reverse()
    .map(
      v =>
        `${calculateOffset(v[0], width)}px ${calculateOffset(v[1], height)}px`
    )}
  )`;
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
                <Fragment>
                  <div className="glow-container">
                    <div
                      className="frame-outer"
                      style={{
                        clipPath: calculatePath(
                          dimensions,
                          simulator.name.length,
                          stationName.length,
                          cardName.length,
                          station.widgets && station.widgets.length
                        )
                      }}
                    />
                    <div
                      className="body-background"
                      style={{
                        clipPath: calculateBody(
                          dimensions,
                          simulator.name.length,
                          stationName.length,
                          cardName.length,
                          station.widgets && station.widgets.length
                        )
                      }}
                    />
                  </div>

                  <div
                    className="dark-background"
                    style={{
                      clipPath: darkPath(
                        dimensions,
                        simulator.name.length,
                        stationName.length,
                        cardName.length,
                        station.widgets && station.widgets.length
                      )
                    }}
                  />
                </Fragment>
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
