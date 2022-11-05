import React, {Fragment} from "react";
import {Input, Card, Button, ButtonGroup} from "helpers/reactstrap";
import {
  StationSet,
  useAddStationMutation,
  useRemoveStationMutation,
  useRenameStationMutation,
  useSetStationCrewCountMutation,
} from "generated/graphql";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";

interface StationPickerProps {
  stationSet: StationSet;
}
const StationPicker: React.FC<StationPickerProps> = ({stationSet}) => {
  const {subPath2: selectedStationUnparsed} = useParams();
  const navigate = useNavigate();
  const selectedStation = decodeURI(selectedStationUnparsed || "");

  function selectStation(prop: string | null) {
    if (!prop) {
      navigate("../");
    }
    navigate(`${selectedStation ? "../" : ""}${prop}`);
  }

  const [addStationMutation] = useAddStationMutation();
  const [removeStationMutation] = useRemoveStationMutation();
  const [renameStationMutation] = useRenameStationMutation();
  const [setCrewCountMutation] = useSetStationCrewCountMutation();

  const removeStation = () => {
    if (window.confirm("Are you sure you want to delete that station?")) {
      if (!stationSet.id || !selectedStation) return;
      removeStationMutation({
        variables: {
          id: stationSet.id,
          stationName: selectedStation,
        },
      });
      selectStation(null);
    }
  };
  const addStation = () => {
    if (!stationSet.id) return;
    let name = prompt("What is the station name?");
    if (name) {
      addStationMutation({
        variables: {
          id: stationSet.id,
          name,
        },
      });
    }
  };
  const renameStation = () => {
    const name = prompt("What is the new name of the station?");
    if (name && stationSet.id && selectedStation) {
      renameStationMutation({
        variables: {
          id: stationSet.id,
          name: selectedStation,
          newName: name,
        },
      }).then(() => selectStation(name));
      selectStation(null);
    }
  };
  return (
    <Fragment>
      <h4>Stations</h4>
      <Card className="scroll">
        {stationSet && (
          <li className="list-group-item">
            Default Bridge Crew Count:{" "}
            <Input
              key={stationSet.id || ""}
              defaultValue={String(stationSet.crewCount)}
              onBlur={e =>
                stationSet.id &&
                setCrewCountMutation({
                  variables: {
                    stationSetId: stationSet.id,
                    crewCount: parseInt(e.target.value, 10),
                  },
                })
              }
            />
          </li>
        )}
        {stationSet?.stations?.map(s => (
          <li
            key={s?.name || ""}
            className={`list-group-item ${
              selectedStation === s?.name ? "active" : ""
            }`}
            onClick={() => selectStation(s?.name || null)}
          >
            {s?.name}
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
