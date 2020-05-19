import React from "react";
import {Button} from "helpers/reactstrap";
import {css} from "@emotion/core";
import Beam from "./beam";
import Target from "./target";
import Bars from "./bars";
import "./style.scss";
import {
  Simulator,
  TractorBeam as TractorBeamI,
  useTractorBeamStrengthMutation,
} from "generated/graphql";

const OneBeam: React.FC<{
  tractorBeam: TractorBeamI;
  simulator: Simulator;
  maxPower: number;
  toggleBeam: (beam: string) => void;
}> = ({tractorBeam, simulator, maxPower, toggleBeam}) => {
  const beam = tractorBeam.beams[0];
  const {assets} = simulator;
  const [setStrength] = useTractorBeamStrengthMutation();
  return (
    <div
      css={css`
        padding: 2rem 0;
        height: 100%;
        display: grid;
        gap: 4em;
        grid-template-columns: 1fr 120px 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 120px 2rem 44px;
        align-content: center;
        grid-template-areas:
          "nothing nothing ship ship ship"
          "nothing nothing ship ship ship"
          "nothing3 target nothing2 stress strength"
          "nothing4 nothing4 nothing4 stress strength"
          "activate activate activate stress strength";
      `}
    >
      <Beam
        css={css`
          grid-column: 2/5;
          grid-row: 2/4;
          width: 100%;
          height: 100%;
          mask-size: 100% 100%;
          mask-image: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0) 10%,
            rgba(0, 0, 0, 1) 20%,
            rgba(0, 0, 0, 1) 100%
          );
        `}
        shown={beam.state}
      />

      <div
        aria-label="ship"
        css={css`
    background-image: url("/assets/${assets?.side}");
    grid-area:ship;
    background-size: contain;
    background-position:center;
    background-repeat:no-repeat;
    z-index:10;
    `}
        draggable="false"
      />
      <Target
        css={css`
          grid-area: target;
          align-self: center;
          justify-self: center;
          width: 100%;
        `}
        shown={beam.target}
        label={beam.targetLabel}
      />
      <Bars
        css={css`
          grid-area: stress;
        `}
        className="stressBar"
        flop
        label="Stress"
        active={beam.state}
        simulator={simulator}
        level={beam.stress}
      />
      <Bars
        css={css`
          grid-area: strength;
        `}
        className="strengthBar"
        label="Strength"
        arrow
        color={"blue"}
        active={beam.state}
        simulator={simulator}
        max={maxPower}
        level={Math.min(1, Math.max(0, Math.min(beam.strength, maxPower)))}
        mouseUp={level =>
          setStrength({
            variables: {
              id: tractorBeam.id,
              beam: beam.id,
              strength: Math.min(1, Math.max(0, level)),
            },
          })
        }
      />
      <Button
        css={css`
          grid-area: activate;
        `}
        size="lg"
        onClick={() => toggleBeam(beam.id)}
        className="activate"
        disabled={!beam.target}
      >
        {beam.state ? "Deactivate" : "Activate"}{" "}
        {tractorBeam.displayName || tractorBeam.name}
      </Button>
    </div>
  );
};

export default OneBeam;
