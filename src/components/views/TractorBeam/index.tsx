import React from "react";
import {Container} from "helpers/reactstrap";
import DamageOverlay from "../helpers/DamageOverlay";
import Tour from "helpers/tourHelper";

import "./style.scss";
import {
  Simulator,
  TractorBeam as TractorBeamI,
  useTractorBeamUpdateSubscription,
  useTractorBeamStateMutation,
} from "generated/graphql";
import OneBeam from "./OneBeam";
import MultiBeams from "./MutliBeam";

const trainingSteps = (
  tractorBeam: Pick<TractorBeamI, "name" | "displayName">,
) => [
  {
    selector: ".activate",
    content: `The ${
      tractorBeam.displayName || tractorBeam.name
    } pulls objects to you with zero-point energy. Once a target it in sight, it will appear below the ship. Press this button to activate the ${
      tractorBeam.displayName || tractorBeam.name
    }.`,
  },
  {
    selector: ".strengthBar",
    content: `The size and speed of the object will impact the stress on the ${
      tractorBeam.displayName || tractorBeam.name
    }. If the object is large, fast, or dense, it will put more stress on our ship, and we will need to strengthen the ${
      tractorBeam.displayName || tractorBeam.name
    } in order to pull in the object. If we pull it in too fast, the object may collide with our ship and cause damage. Use this tool to match the strength of the ${
      tractorBeam.displayName || tractorBeam.name
    } to the stress being put on it.`,
  },
];

function isNumber(l: unknown): l is number {
  return typeof l === "number";
}

const TractorBeam: React.FC<{simulator: Simulator}> = ({simulator}) => {
  const {data} = useTractorBeamUpdateSubscription({
    variables: {simulatorId: simulator.id},
  });
  const [setState] = useTractorBeamStateMutation();
  const tractorBeam = data?.tractorBeamUpdate?.[0];
  if (!tractorBeam) return <p>No Tractor Beam</p>;
  const toggleBeam = (beam: string) => {
    setState({
      variables: {
        id: tractorBeam.id,
        beam,
        state: !tractorBeam.beams.find(b => b.id === beam)?.state,
      },
    });
  };

  const powerLength = tractorBeam.power.powerLevels?.length || 0;
  const power = tractorBeam.power.power || 0;
  const levels = tractorBeam.power.powerLevels?.filter(isNumber) || [0];
  const maxPower = Math.min(
    1,
    powerLength
      ? (power + 1 - levels[0]) / (levels[powerLength - 1] - levels[0] + 1)
      : 1,
  );

  // const beamCount = tractorBeam.beams.length;
  return (
    <Container fluid className="tractor-beam">
      <DamageOverlay
        system={tractorBeam}
        message={`${tractorBeam.displayName || tractorBeam.name} Offline`}
      />
      {tractorBeam.beams.length === 1 ? (
        <OneBeam
          tractorBeam={tractorBeam}
          simulator={simulator}
          toggleBeam={toggleBeam}
          maxPower={maxPower}
        />
      ) : (
        <MultiBeams
          tractorBeam={tractorBeam}
          simulator={simulator}
          toggleBeam={toggleBeam}
          maxPower={maxPower}
        />
      )}
      <Tour steps={trainingSteps(tractorBeam)} />
    </Container>
  );
};

export default TractorBeam;
