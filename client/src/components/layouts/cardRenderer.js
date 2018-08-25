import React from "react";
import Views from "../views";
import CardHolder from "./CardHolder";

export default function renderCards(props) {
  let { station, cardName, clientObj } = props;
  const {
    cards = [
      {
        component: "Viewscreen",
        name: "Viewscreen"
      }
    ]
  } = station;
  if (clientObj.loginState === "logout" && station.login === false) {
    cardName = "Login";
  }
  if (clientObj.offlineState) {
    cardName = "Offline";
  }
  if (
    !clientObj.offlineState &&
    clientObj.hypercard &&
    Views[clientObj.hypercard]
  ) {
    const Comp = Views[clientObj.hypercard];
    return <CardHolder component={Comp} {...props} />;
  }
  return cards
    .concat({ name: "Login", component: "Login", icon: "Login" })
    .concat({
      name: "Offline",
      component: "Offline",
      icon: "Offline"
    })
    .map(card => {
      if (card.name === cardName) {
        const component = Views[card.component];
        if (card.component.match(/.{8}-.{4}-.{4}-.{4}-.{12}/gi)) {
          // Software Panel
          return (
            <CardHolder
              component={Views.SoftwarePanels}
              panel={card.component}
              {...props}
              key={card.name}
            />
          );
        }
        return <CardHolder component={component} {...props} key={card.name} />;
      }
      return null;
    })
    .filter(card => card);
}
