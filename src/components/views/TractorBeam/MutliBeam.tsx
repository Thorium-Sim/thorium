import React from "react";
import {Button} from "helpers/reactstrap";
import {css} from "@emotion/core";
import Beam from "./beam";
import Target from "./target";
import "./style.scss";
import {
  Simulator,
  TractorBeam as TractorBeamI,
  useTractorBeamStrengthMutation,
  TractorBeamBeam,
} from "generated/graphql";
import {useGesture} from "react-use-gesture";
import useMeasure from "helpers/hooks/useMeasure";

const StrengthBar: React.FC<{
  index: number;
  state: boolean;
  strength: number;
  maxPower: number;
  beam: string;
  id: string;
}> = ({state, index, strength, id, beam, maxPower}) => {
  const [str, setStr] = React.useState(strength);
  const [ref, dimensions] = useMeasure<HTMLDivElement>();
  React.useEffect(() => {
    setStr(strength);
  }, [strength]);
  const [setStrength] = useTractorBeamStrengthMutation();
  const bind = useGesture({
    onDrag: ({xy: [x]}) => {
      setStr(
        Math.min(
          maxPower,
          Math.max(0, (x - dimensions.left) / dimensions.width),
        ),
      );
    },
    onDragEnd: () => {
      setStrength({variables: {id, beam, strength: str}});
    },
  });

  return (
    <div
      className="strengthBar"
      css={css`
        grid-area: ${`strength${index}`};
        display: flex;
        align-items: center;
        transition: opacity 1s ease;
        opacity: ${state ? 1 : 0};
      `}
    >
      <span
        css={css`
          flex: 1;
        `}
      >
        Strength:
      </span>
      <div
        ref={ref}
        css={css`
          position: relative;
          flex: 3;
          border: solid 1px rgba(255, 255, 255, 0.5);
          padding: 1px;
          margin-left: 1rem;
          height: 100%;
        `}
      >
        <div
          css={css`
            position: absolute;
            left: 0;
            top: 0;
            width: ${str * 100}%;
            height: 100%;
            background: linear-gradient(
              90deg,
              rgba(0, 80, 139, 0.5) 0%,
              rgba(0, 80, 255, 1) 100%
            );
          `}
        ></div>
        <div
          css={css`
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            transform: translateX(${str * 100}%);
          `}
        >
          <div
            {...bind()}
            css={css`
              cursor: pointer;
              background-color: rgb(80, 160, 255);
              box-shadow: 0px 0px 10px 2px rgba(0, 0, 80, 0.2);
              border-radius: 0 50% 50% 0;
              height: 24px;
              width: 6px;
            `}
          ></div>
        </div>
      </div>
    </div>
  );
};
const BeamInst: React.FC<{
  index: number;
  beam: TractorBeamBeam;
  tractorBeam: TractorBeamI;

  maxPower: number;
  toggleBeam: (beam: string) => void;
}> = ({index, beam, tractorBeam, maxPower, toggleBeam}) => {
  return (
    <React.Fragment>
      <Beam
        css={css`
          grid-column: ${index % 2 === 0 ? `5/8` : `2/5`};
          grid-row: ${index > 2 ? "3/5" : "8/11"};
          transform: scaleX(${index % 2 === 0 ? -1 : 1});
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
      <StrengthBar
        id={tractorBeam.id}
        beam={beam.id}
        state={beam.state}
        index={index}
        strength={beam.strength}
        maxPower={maxPower}
      />
      <div
        css={css`
          grid-area: ${`stress${index}`};
          display: flex;
          align-items: center;
          transition: opacity 1s ease;
          opacity: ${beam.state ? 1 : 0};
        `}
      >
        <span
          css={css`
            flex: 1;
          `}
        >
          Stress:
        </span>
        <div
          css={css`
            flex: 3;
            border: solid 1px rgba(255, 255, 255, 0.5);
            padding: 1px;
            margin-left: 1rem;
            height: 100%;
          `}
        >
          <div
            css={css`
              width: ${beam.stress * 100}%;
              height: 100%;
              background: linear-gradient(
                90deg,
                rgba(139, 0, 0, 0.5) 0%,
                rgba(255, 0, 0, 1) 100%
              );
            `}
          ></div>
        </div>
      </div>
      <Target
        css={css`
          grid-area: ${`target${index}`};
          align-self: center;
          justify-self: center;
          width: 100px;
          height: 130px;
        `}
        shown={beam.target}
        label={beam.targetLabel}
      />
      <Button
        css={css`
          grid-area: ${`activate${index}`};
        `}
        size="lg"
        onClick={() => toggleBeam(beam.id)}
        className="activate"
        disabled={!beam.target}
      >
        {beam.state ? "Deactivate" : "Activate"}{" "}
        {tractorBeam.displayName || tractorBeam.name} {index}
      </Button>
    </React.Fragment>
  );
};
const MultiBeams: React.FC<{
  tractorBeam: TractorBeamI;
  simulator: Simulator;
  maxPower: number;
  toggleBeam: (beam: string) => void;
}> = ({tractorBeam, simulator, maxPower, toggleBeam}) => {
  const {assets} = simulator;

  return (
    <div
      css={css`
        height: 100%;
        display: grid;
        gap: 1em;
        grid-template-columns: 140px 100px 140px 1fr 1fr 140px 100px 140px;
        grid-template-rows: 1fr 1fr 1fr 65px 65px 44px 1fr 1fr 1fr 65px 65px 44px;
        grid-template-areas:
          "nothing    nothing    nothing   ship ship  nothing4    nothing4    nothing4"
          "strength3  strength3  strength3 ship ship  strength4   strength4   strength4"
          "stress3    stress3    stress3   ship ship  stress4     stress4     stress4"
          "nothing5   target3    nothing6  ship ship  nothing7    target4     nothing8"
          "nothing5   target3    nothing6  ship ship  nothing7    target4     nothing8"
          "activate3  activate3  activate3 ship ship  activate4   activate4   activate4"
          "nothing2   nothing2   nothing2  ship ship  nothing3    nothing3    nothing3"
          "strength1  strength1  strength1 ship ship  strength2   strength2   strength2"
          "stress1    stress1    stress1   ship ship  stress2     stress2     stress2"
          "nothing12  target1    nothing11 ship ship  nothing10   target2     nothing9"
          "nothing12  target1    nothing11 ship ship  nothing10   target2     nothing9"
          "activate1  activate1  activate1 ship ship  activate2   activate2   activate2";
      `}
    >
      <div
        css={css`
          grid-area: ship;
          z-index: 10;
        `}
      >
        <div
          aria-label="ship"
          css={css`
            background-image: url("/assets/${assets?.top}");
            transform: rotate(-90deg);
            width:100%;
            height:100%;
            background-size: contain;
            background-position:center;
            background-repeat:no-repeat;
    `}
          draggable="false"
        />
      </div>
      {tractorBeam.beams.map((b, i) => (
        <BeamInst
          index={i + 1}
          beam={b}
          tractorBeam={tractorBeam}
          toggleBeam={toggleBeam}
          maxPower={maxPower}
        />
      ))}
    </div>
  );
};

export default MultiBeams;
