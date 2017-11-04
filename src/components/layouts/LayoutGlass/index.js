import React, { Component } from "react";
import ActionsMixin from "../../generic/Actions";
import Views from "../../views";

import "./layout.css";

export default props => {
  let { simulator, station, cardName, changeCard, clientObj } = props;
  const cards = station.cards
    .concat({ name: "Login", component: "Login", icon: "Login" })
    .concat({
      name: "Offline",
      component: "Offline",
      icon: "Offline"
    });
  const currentCard = cards.find(c => c.name === cardName);
  const RenderedComponent = Views[currentCard.component];
  return (
    <ActionsMixin {...props}>
      <div className={`layout-glass`}>
        <div
          className="cardContainer container"
          style={{ width: "100%", position: "absolute", alignSelf: "center" }}
        >
          <RenderedComponent {...props} topTraining={() => {}} />
        </div>
        <div className={`frame`}>
          <h1 className="sim-name">{simulator.name}</h1>
          <h2 className="station-name">{station.name}</h2>
          <h3 className="login-name">{clientObj.loginName}</h3>
        </div>
      </div>
    </ActionsMixin>
  );
};
