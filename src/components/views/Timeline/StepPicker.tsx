import React from "react";
import {Mission} from "generated/graphql";
import {Button, ButtonGroup} from "reactstrap";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

const StepPicker: React.FC<{
  mission: Mission;
  selectedStep: string;
  setSelectedStep: React.Dispatch<React.SetStateAction<string>>;
}> = ({mission, selectedStep, setSelectedStep}) => {
  return (
    <ButtonGroup>
      <Button
        color="primary"
        size="sm"
        onClick={() => {
          const index =
            mission.timeline.findIndex(m => m.id === selectedStep) - 1;
          if (index < 0) return;
          setSelectedStep(mission.timeline[index].id);
        }}
      >
        <FaArrowLeft />
      </Button>

      <select
        className="btn-secondary"
        style={{width: "100%"}}
        value={selectedStep || "mission"}
        onChange={e => {
          setSelectedStep(e.target.value);
        }}
      >
        <option value={"mission"}>Mission Info</option>
        <hr />
        {mission.timeline.map((t, i) => (
          <option key={t.id} value={t.id}>
            {i + 1}: {t.name}
          </option>
        ))}
      </select>
      <Button
        color="primary"
        size="sm"
        onClick={() => {
          const index =
            mission.timeline.findIndex(m => m.id === selectedStep) + 1;
          if (index >= mission.timeline.length || !mission.timeline[index])
            return;
          setSelectedStep(mission.timeline[index].id);
        }}
      >
        <FaArrowRight />
      </Button>
    </ButtonGroup>
  );
};

export default StepPicker;
