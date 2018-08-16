import React, { Fragment } from "react";
import { Card, Button, ButtonGroup } from "reactstrap";
import ops from "./ops";

const StationPicker = ({
  client,
  stationSet,
  selectedStation,
  selectStation
}) => {
  const removeStation = () => {
    if (window.confirm("Are you sure you want to delete that station?")) {
      const variables = {
        id: stationSet.id,
        stationName: selectedStation
      };
      selectStation(null);
      client.mutate({
        mutation: ops.removeStation,
        variables
      });
    }
  };
  const addStation = () => {
    let name = prompt("What is the station name?");
    if (name) {
      const variables = {
        id: stationSet.id,
        name
      };
      client.mutate({
        mutation: ops.addStation,
        variables
      });
    }
  };
  const renameStation = () => {
    const name = prompt("What is the new name of the station?");
    if (name) {
      const variables = {
        id: stationSet.id,
        name: selectedStation,
        newName: name
      };
      selectStation(null);
      client
        .mutate({
          mutation: ops.renameStation,
          variables
        })
        .then(() => selectStation(name));
    }
  };
  return (
    <Fragment>
      <h4>Stations</h4>
      <Card className="scroll">
        {stationSet &&
          stationSet.stations.map(s => (
            <li
              key={s.name}
              className={`list-group-item ${
                selectedStation === s.id ? "selected" : ""
              }`}
              onClick={() => selectStation(s.name)}
            >
              {s.name}
            </li>
          ))}
      </Card>
      <Button size="sm" color="success" onClick={addStation}>
        Add Station
      </Button>
      {selectedStation && (
        <ButtonGroup>
          <Button size="sm" color="info" onClick={renameStation}>
            Rename Station
          </Button>
          <Button size="sm" color="danger" onClick={removeStation}>
            Remove Station
          </Button>
        </ButtonGroup>
      )}
    </Fragment>
  );
};
export default StationPicker;
