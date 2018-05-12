import React, { Fragment } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

const MissionConfig = ({
  mission,
  removeMission,
  updateMission,
  exportMissionScript
}) => {
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
      <a id="downloadAnchorElem" style={{ display: "none" }}>
        Nothing here
      </a>
      <Button
        tag="a"
        size="sm"
        href={`${window.location.protocol}//${
          window.location.hostname
        }:${parseInt(window.location.port, 10) + 1}/exportMission/${
          mission.id
        }`}
        block
        color="info"
      >
        Export
      </Button>
      <Button
        color="warning"
        size="sm"
        block
        onClick={() => exportMissionScript(mission)}
      >
        Export Mission Script
      </Button>
      <Button onClick={removeMission} size="sm" color="danger">
        Remove
      </Button>
    </Fragment>
  );
};

export default MissionConfig;
