import React from "react";
import {Simulator} from "generated/graphql";

const CardFrame: React.FC<{
  viewscreen: boolean;
  clientObj: any;
  simulator: Simulator;
  stationName: string;
}> = ({children, viewscreen, clientObj, simulator, stationName}) => {
  return (
    <div className="card-frame">
      <h1 className="simulator-name">{simulator.name}</h1>
      <h2 className="station-name">{stationName}</h2>
      <div className="slices">
        <div className="slice-tl"></div>
        <div className="slice-tr"></div>
        <div className="slice-bl"></div>
        <div className="slice-br"></div>
        <div className="slice-t"></div>
        <div className="slice-l"></div>
        <div className="slice-b"></div>
        <div className="slice-r"></div>
      </div>
      <div
        className="card-area"
        style={{zIndex: viewscreen && !clientObj.overlay ? 1000 : 1}}
      >
        {children}
      </div>
    </div>
  );
};

export default CardFrame;
