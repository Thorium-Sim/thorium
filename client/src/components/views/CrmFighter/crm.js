import React from "react";
import { FormattedMessage } from "react-intl";
import Tour from "helpers/tourHelper";
import FighterCanvas from "./fighterCanvas";
import PhaserCharging from "./phaserCharging";
import TorpedoLoading from "./torpedoLoading";
import Controls from "./controls";
import Shield from "./shield";
import Joystick from "./joystick";
const trainingSteps = [
  {
    selector: ".blank",
    content: (
      <FormattedMessage
        id="crm-training-1"
        defaultMessage="The CRM is an automated fighter system that can be controlled by any of the stations on the bridge. This screen allows you to activate the CRM system on those stations."
      />
    )
  },
  {
    selector: ".station-list",
    content: (
      <FormattedMessage
        id="crm-training-2"
        defaultMessage="To choose the stations you want to activate the CRM on, click on the name of the station in this list to toggle it on or off."
      />
    )
  },
  {
    selector: ".select-all-stations",
    content: (
      <FormattedMessage
        id="crm-training-3"
        defaultMessage="Click this button to select all of the stations."
      />
    )
  },
  {
    selector: ".activate-crm",
    content: (
      <FormattedMessage
        id="crm-training-4"
        defaultMessage="Click this button to activate the CRM on the selected stations."
      />
    )
  }
];

const Crm = ({
  crm: { id, enemies, fighters, interval, fighterImage },
  fighter: { phaserLevel, id: fighterId, shield, hull, shieldRaised },
  clientObj,
  client
}) => {
  return (
    <div className="card-crm-fighter">
      <FighterCanvas
        clientId={clientObj.id}
        enemies={enemies}
        fighters={fighters}
        interval={interval}
        fighterId={fighterId}
      />
      <PhaserCharging
        id={id}
        clientId={clientObj.id}
        phaserLevel={phaserLevel}
      />
      <TorpedoLoading />
      <Controls
        id={id}
        clientId={clientObj.id}
        phaserLevel={phaserLevel}
        shieldRaised={shieldRaised}
      />
      <Shield
        fighterImage={fighterImage}
        shield={shield}
        hull={hull}
        shieldRaised={shieldRaised}
      />
      <Joystick id={id} clientId={clientObj.id} client={client} />
      <Tour steps={trainingSteps} client={clientObj} />
    </div>
  );
};
export default Crm;
