import React from "react";
import Views from "../../views";
import Alerts from "../../generic/Alerts";
import ActionsMixin from "../../generic/Actions";
import "./style.css";

export default props => {
  const { simulator, station, clientObj } = props;
  let cardName = props.cardName;
  let alertClass = `alertColor${simulator.alertlevel || 5}`;
  if (clientObj.loginState === "logout" && station.login === false) {
    cardName = "Login";
  }
  if (clientObj.offlineState) {
    cardName = "Offline";
  }
  return (
    <ActionsMixin {...props}>
      <div className={`layout-jr card-area ${alertClass}`}>
        {station.cards
          .concat({ name: "Login", component: "Login", icon: "Login" })
          .concat({
            name: "Offline",
            component: "Offline",
            icon: "Offline"
          })
          .map(card => {
            const Component = Views[card.component];
            if (card.name === cardName) {
              return <Component {...props} />;
            }
            return null;
          })
          .filter(card => card)}
      </div>
      <div id="jr-frame" className={alertClass}>
        <div className="title-bar" />
        <h1 className="simulator-name">{simulator.name}</h1>
        <h1 className="station-name">{station.name}</h1>
        <Alerts simulator={simulator} station={station} />
      </div>
    </ActionsMixin>
  );
};
