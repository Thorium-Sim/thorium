import React from "react";
import { Button as RSButton } from "helpers/reactstrap";
import { playSound } from "components/generic/SoundPlayer";
import { SimulatorContext } from "components/client/simulatorData";
import { randomFromList } from "helpers/randomFromList";

const Button = ({ onClick = () => {}, onMouseOver = () => {}, ...props }) => {
  const simulator = React.useContext(SimulatorContext);

  const click = e => {
    console.log(simulator);
    if (simulator.soundEffects && simulator.soundEffects.buttonClick) {
      console.log(
        `/assets${randomFromList(simulator.soundEffects.buttonClick)}`
      );
      playSound({
        url: `/assets${randomFromList(simulator.soundEffects.buttonClick)}`
      });
    }
    onClick(e);
  };
  const mouseOver = e => {
    if (simulator.soundEffects && simulator.soundEffects.buttonHover) {
      playSound({
        url: `/assets${randomFromList(simulator.soundEffects.buttonHover)}`
      });
    }
    onMouseOver(e);
  };
  return <RSButton onClick={click} onMouseOver={mouseOver} {...props} />;
};
export default Button;
