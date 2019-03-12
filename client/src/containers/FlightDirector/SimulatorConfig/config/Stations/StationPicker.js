import React, { Fragment } from "react";
import { Input, Card, Button, ButtonGroup } from "reactstrap";
import ops from "./ops";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

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
        {stationSet && (
          <li className="list-group-item">
            Default Bridge Crew Count:{" "}
            <Mutation
              mutation={gql`
                mutation SetCrewCount($stationSetId: ID!, $crewCount: Int!) {
                  setStationSetCrewCount(
                    stationSetID: $stationSetId
                    crewCount: $crewCount
                  )
                }
              `}
            >
              {action => (
                <Input
                  key={stationSet.id}
                  defaultValue={stationSet.crewCount}
                  onBlur={e =>
                    action({
                      variables: {
                        stationSetId: stationSet.id,
                        crewCount: e.target.value
                      }
                    })
                  }
                />
              )}
            </Mutation>
          </li>
        )}
        {stationSet &&
          stationSet.stations.map(s => (
            <li
              key={s.name}
              className={`list-group-item ${
                selectedStation === s.name ? "active" : ""
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
