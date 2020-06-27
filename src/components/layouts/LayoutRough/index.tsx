import React from "react";

import CardFrame from "./cardFrame";
import Widgets from "../LayoutOdyssey/widgets";
import CardSwitcher from "./cardSwitcher";
import CardHolder from "../cardRenderer";
import "./style.scss";

const LayoutRough = (props: any) => {
  const [touch, setTouch] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "touchstart",
      function onFirstTouch() {
        setTouch(true);
        window.removeEventListener("touchstart", onFirstTouch);
      },
      false,
    );
  }, []);

  let {simulator, station, cardName, changeCard, clientObj, flight} = props;
  const {hypercard} = clientObj;
  let alertClass = `alertColor${simulator.alertlevel || 5}`;
  return (
    <div className={`layout-rough ${alertClass}`}>
      {!hypercard && (
        <CardSwitcher
          className={alertClass}
          clientObj={clientObj}
          cards={station.cards}
          currentCard={cardName}
          changeCard={changeCard}
          {...props}
        />
      )}
      <CardFrame {...props} stationName={station.name}>
        <CardHolder {...props} />
      </CardFrame>
      <Widgets
        clientObj={clientObj}
        simulator={simulator}
        station={station}
        flight={flight}
        touch={touch}
      />
    </div>
  );
};

export default LayoutRough;
