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
    </Fragment>
  );
};

export default MissionConfig;
