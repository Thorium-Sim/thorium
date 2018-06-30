import React, { Fragment } from "react";
import Alerts from "../../generic/Alerts";
import renderCards from "../cardRenderer";
import "./style.scss";

export default props => {
  const { simulator, station } = props;
  let alertClass = `alertColor${simulator.alertlevel || 5}`;
  return (
    <Fragment>
      <div className={`layout-jr card-area ${alertClass}`}>
        {renderCards(props)}
      </div>
      <div id="jr-frame" className={alertClass}>
        <div className="title-bar" />
        <h1 className="simulator-name">{simulator.name}</h1>
        <h1 className="station-name">{station.name}</h1>
        <Alerts simulator={simulator} station={station} />
      </div>
    </Fragment>
  );
};
