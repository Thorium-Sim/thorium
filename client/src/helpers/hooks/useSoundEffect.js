import React from "react";

import { playSound } from "components/generic/SoundPlayer";
import { SimulatorContext } from "components/client/simulatorData";
import { randomFromList } from "helpers/randomFromList";

export default function useSoundEffect() {
  const simulator = React.useContext(SimulatorContext);
  return function(sound) {
    if (simulator.soundEffects && simulator.soundEffects[sound]) {
      playSound({
        url: `/assets${randomFromList(simulator.soundEffects[sound])}`
      });
    }
  };
}
