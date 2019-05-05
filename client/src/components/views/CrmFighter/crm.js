import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Tour from "helpers/tourHelper";
import FighterCanvas from "./fighterCanvas";
import PhaserCharging from "./phaserCharging";
import TorpedoLoading from "./torpedoLoading";
import Controls from "./controls";
import Shield from "./shield";
import Joystick from "./joystick";
import Docked from "./docked";
import Destroyed from "./destroyed";
import distance from "helpers/distance";

const dockedTrainingSteps = (name, docked, hypercard) => [
  {
    selector: ".blank",
    content: (
      <FormattedMessage
        id="crm-docked-1"
        defaultMessage="This is the control screen for your {name} fighter. It is currently docked, which means it is safe inside of your ship. However, it won't do much good until you undock it."
        values={{ name }}
      />
    )
  },
  {
    selector: ".fighter-strength",
    content: (
      <FormattedMessage
        id="crm-docked-2"
        defaultMessage="When docked, your fighter will automatically repair and recharge the shields. This is necessary to make sure it doesn't get destroyed. You can also see your torpedo count here."
      />
    )
  },
  {
    selector: ".restock-button",
    content: (
      <FormattedMessage
        id="crm-docked-3"
        defaultMessage="Click this button to restock your fighter's torpedos."
      />
    )
  },
  hypercard && {
    selector: ".station-control",
    content: (
      <FormattedMessage
        id="crm-docked-4"
        defaultMessage="If your station's {name} control was activated by another station, you can return to normal station control by clicking this button. However, doing this is one-way. You cannot return to this screen without having it manually reactivated."
        values={{ name }}
      />
    )
  },
  {
    selector: ".launch-button",
    content: (
      <FormattedMessage
        id="crm-docked-5"
        defaultMessage="It takes a few moments to prepare your fighter to launch. Once this button activates, you can click it to launch your fighter into space. Click this button to continue your training."
      />
    )
  }
];
const fighterTrainingSteps = () => [
  {
    selector: ".fighter-canvas",
    content: (
      <FormattedMessage
        id="crm-fighter-1"
        defaultMessage="This screen shows you the view outside of your ship, looking from the top down. The icon in the center of the screen is your fighter."
      />
    )
  },

  {
    selector: ".fighter-canvas",
    content: (
      <FormattedMessage
        id="crm-fighter-1.5"
        defaultMessage="Some of the contacts moving around on this screen are your fellow crewmembers fighters. Others are enemies. To target and fire at enemies, you must first click on the enemy contact you wish to fire at."
      />
    )
  },
  {
    selector: ".shield-raise-button",
    content: (
      <FormattedMessage
        id="crm-fighter-1.7"
        defaultMessage="Before doing anything else, click this button to raise your shields. This will protect your fighter from enemy fire."
      />
    )
  },
  {
    selector: ".simulator-image",
    content: (
      <FormattedMessage
        id="crm-fighter-2"
        defaultMessage="This is your ship. To dock your fighter, you must move it to be within docking range of your ship."
      />
    )
  },
  {
    selector: ".inner-canvas",
    content: (
      <FormattedMessage
        id="crm-fighter-2.5"
        defaultMessage="This smaller map shows you the entire combat area. This can help you identify the location of enemy ships and where to go to dock with the main starship."
      />
    )
  },
  {
    selector: ".joystick",
    content: (
      <FormattedMessage
        id="crm-fighter-3"
        defaultMessage="Click and drag the circle in the center of this joystick to move your fighter."
      />
    )
  },
  {
    selector: ".phaser-charging",
    content: (
      <FormattedMessage
        id="crm-fighter-4"
        defaultMessage="This shows the phaser charge of your fighter. You must click and hold the 'Charge' button to be able to fire phasers at enemies."
      />
    )
  },
  {
    selector: ".torpedo-loading",
    content: (
      <FormattedMessage
        id="crm-fighter-5"
        defaultMessage="This shows the torpedo launcher of your fighter. Click the button to load a torpedo. Only one torpedo can be loaded at any time. If you run out of torpedos, you can dock with your ship and restock."
      />
    )
  },
  {
    selector: ".phaser-fire-button",
    content: (
      <FormattedMessage
        id="crm-fighter-5"
        defaultMessage="After targeting an enemy contact, click and hold this button to fire phasers at it."
      />
    )
  },
  {
    selector: ".torpedo-fire-button",
    content: (
      <FormattedMessage
        id="crm-fighter-6"
        defaultMessage="After targeting an enemy contact, click this button to fire a torpedo at it. Make sure you are in range so the torpedo does not miss or hit a friendly fighter."
      />
    )
  },

  {
    selector: ".fighter-dock-button",
    content: (
      <FormattedMessage
        id="crm-fighter-7"
        defaultMessage="When in range of your ship, click this button to dock your fighter. This will return you to the docked screen."
      />
    )
  },
  {
    selector: ".fighter-shield",
    content: (
      <FormattedMessage
        id="crm-fighter-8"
        defaultMessage="This shows the shield and hull status of your fighter. Make sure your shield is raised. If you lose your shield or don't have it raised, it will be very easy for enemies to permanently destroy your fighter."
      />
    )
  }
];

const Crm = ({
  crm: {
    id,
    displayName,
    enemies,
    fighters,
    interval,
    fighterImage,
    phasers,
    torpedos
  },
  fighter: {
    phaserLevel,
    id: fighterId,
    shield,
    hull,
    shieldRaised,
    torpedoCount,
    torpedoLoaded,
    docked,
    destroyed
  },
  simulator,
  clientObj
}) => {
  const [targeted, setTargeted] = useState(null);
  const fighterObj = fighters.find(f => f.id === fighterId);

  // Untarget when necessary
  useEffect(() => {
    const target = enemies.find(t => t.id === targeted);
    if (!fighterObj || !target) return;
    if (
      target.destroyed ||
      distance(target.position, fighterObj.position) > 200
    ) {
      setTargeted(null);
    }
  }, [enemies, fighterObj, targeted]);
  return (
    <div className="card-crm-fighter">
      {docked ? (
        <>
          <Docked
            id={id}
            clientId={clientObj.id}
            fighterImage={fighterImage}
            shield={shield}
            hull={hull}
            torpedoCount={torpedoCount}
            hypercard={clientObj.hypercard}
          />
          <Tour
            steps={dockedTrainingSteps(
              displayName,
              docked,
              clientObj.hypercard
            )}
            client={clientObj}
          />
        </>
      ) : destroyed ? (
        <Destroyed clientId={clientObj.id} hypercard={clientObj.hypercard} />
      ) : (
        <>
          <FighterCanvas
            simulator={simulator}
            clientId={clientObj.id}
            enemies={enemies}
            fighters={fighters}
            interval={interval}
            fighterId={fighterId}
            targeted={targeted}
            setTargeted={setTargeted}
            phasers={phasers}
            torpedos={torpedos}
          />
          <PhaserCharging
            id={id}
            clientId={clientObj.id}
            phaserLevel={phaserLevel}
          />
          <TorpedoLoading
            id={id}
            clientId={clientObj.id}
            torpedoCount={torpedoCount}
            torpedoLoaded={torpedoLoaded}
          />
          <Controls
            id={id}
            clientId={clientObj.id}
            phaserLevel={phaserLevel}
            shieldRaised={shieldRaised}
            targeted={targeted}
            torpedoLoaded={torpedoLoaded}
            shield={shield}
            center={fighterObj ? fighterObj.position : { x: 0, y: 0, z: 0 }}
          />
          <Shield
            fighterImage={fighterImage}
            shield={shield}
            hull={hull}
            shieldRaised={shieldRaised}
          />
          <Joystick id={id} clientId={clientObj.id} />
          <Tour
            steps={fighterTrainingSteps(
              displayName,
              docked,
              clientObj.hypercard
            )}
            client={clientObj}
          />
        </>
      )}
    </div>
  );
};
export default Crm;
