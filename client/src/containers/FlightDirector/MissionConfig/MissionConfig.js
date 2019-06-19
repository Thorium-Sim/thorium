import React, { Fragment } from "react";
import { FormGroup, Label, Input } from "reactstrap";

const MissionConfig = ({ mission, updateMission }) => {
  return (
    <Fragment>
      <FormGroup>
        <Label>Mission Name</Label>
        <Input
          type="text"
          defaultValue={mission.name}
          onChange={e => updateMission("name", e)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Mission Description</Label>
        <Input
          type="textarea"
          defaultValue={mission.description}
          name="text"
          onChange={e => updateMission("description", e)}
        />
      </FormGroup>
      <FormGroup>
        <Label>
          <Input
            type="checkbox"
            defaultChecked={mission.aux}
            name="text"
            onChange={e => updateMission("aux", e)}
          />
          Auxiliary Mission
        </Label>
        <div>
          <small>
            Auxiliary missions are reserved for second story lines and are not
            available as the primary mission for a simulator.
          </small>
        </div>
      </FormGroup>
    </Fragment>
  );
};

export default MissionConfig;
