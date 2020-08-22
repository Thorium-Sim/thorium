import React from "react";
import Views from "components/views";
import CardFrame from "./cardFrame";
import "./style.scss";
import {Simulator, Client} from "generated/graphql";

const LayoutRoughViewscreen: React.FC<{
  simulator: Simulator;
  clientObj: Client;
}> = props => {
  const {simulator, clientObj} = props;
  let alertClass = `alertColor${simulator.alertlevel || 5}`;
  return (
    <div className={`layout-rough viewscreen ${alertClass}`}>
      <CardFrame
        simulator={simulator}
        stationName="Viewscreen"
        clientObj={clientObj}
        viewscreen
      >
        {/* @ts-ignore */}
        <Views.Viewscreen {...props} />
      </CardFrame>
    </div>
  );
};

export default LayoutRoughViewscreen;
