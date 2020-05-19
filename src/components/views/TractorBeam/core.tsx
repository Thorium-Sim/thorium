import React from "react";
import {css} from "@emotion/core";
import {InputField, OutputField} from "../../generic/core";
import "./style.scss";
import {
  Simulator,
  useTractorBeamUpdateSubscription,
  useTractorBeamTargetMutation,
  useTractorBeamTargetLabelMutation,
  useTractorBeamStressMutation,
  useTractorBeamStateMutation,
  TractorBeamBeam,
} from "generated/graphql";

const Beam: React.FC<{id: string; beam: TractorBeamBeam; index: number}> = ({
  id,
  beam,
  index,
}) => {
  const [stress, setStress] = React.useState(0);
  const [setState] = useTractorBeamStateMutation();
  const [setStressMutation] = useTractorBeamStressMutation();
  const [setTarget] = useTractorBeamTargetMutation();
  const [setLabel] = useTractorBeamTargetLabelMutation();

  return (
    <div
      css={css`
        border-top: solid 1px rgba(255, 255, 255, 0.5);
      `}
    >
      <p>Tractor Beam {index}</p>
      <OutputField
        alert={beam.state}
        onDoubleClick={() =>
          setState({variables: {id, beam: beam.id, state: !beam.state}})
        }
      >
        {beam.state ? "Active" : "Deactivated"}
      </OutputField>
      <label style={{color: beam.scanning ? "red" : "white"}}>
        Target:{" "}
        <input
          type="checkbox"
          onChange={evt =>
            setTarget({
              variables: {id, beam: beam.id, state: evt.target.checked},
            })
          }
          checked={beam.target}
        />
      </label>

      <div>
        <span>Target Label:</span>
        <InputField
          prompt="What is the target label?"
          onClick={label =>
            setLabel({variables: {id, beam: beam.id, label: String(label)}})
          }
        >
          {beam.targetLabel}
        </InputField>
      </div>
      <div>
        <label
          className={
            beam.state && beam.strength < beam.stress ? "text-warning" : ""
          }
        >
          Strength: {Math.round(beam.strength * 100)}
        </label>
        <label>
          Stress: {Math.round(beam.stress * 100)}{" "}
          <input
            style={{width: "50%", float: "right"}}
            onChange={e => setStress(parseFloat(e.target.value))}
            onMouseUp={() =>
              setStressMutation({variables: {id, beam: beam.id, stress}})
            }
            defaultValue={beam.stress}
            type="range"
            min="0"
            max="1"
            step="0.01"
          />
        </label>
      </div>
    </div>
  );
};

const TractorBeamCore: React.FC<{simulator: Simulator}> = ({simulator}) => {
  const {data} = useTractorBeamUpdateSubscription({
    variables: {simulatorId: simulator.id},
  });
  const tractorBeam = data?.tractorBeamUpdate?.[0];
  if (!tractorBeam) return <p>No Tractor Beam</p>;

  return (
    <div className="tractor-beam-core">
      {tractorBeam.beams.map((b, i) => (
        <Beam key={b.id} id={tractorBeam.id} beam={b} index={i + 1} />
      ))}
    </div>
  );
};

export default TractorBeamCore;
