import React from "react";
import {Button} from "helpers/reactstrap";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
import {useParams} from "react-router";
import {Station, AssetObject, useSetAmbianceMutation} from "generated/graphql";

interface AmbianceConfigProps {
  station: Station;
}

const AmbianceConfig: React.FC<AmbianceConfigProps> = ({station}) => {
  const {subPath1: selectedStationSet} = useParams();
  const [edit, setEdit] = React.useState(false);

  const [setAmbianceMutation] = useSetAmbianceMutation();

  return (
    <>
      <label>Ambiance: {station.ambiance || "None"}</label>
      {edit ? (
        <>
          <Button color="info" size="sm" onClick={() => setEdit(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            color="warning"
            onClick={() => {
              if (!selectedStationSet || !station.name) return;
              setAmbianceMutation({
                variables: {
                  stationSetID: selectedStationSet,
                  stationName: station.name,
                  ambiance: "",
                },
              });
              setEdit(false);
            }}
          >
            Clear Ambiance
          </Button>
          <FileExplorer
            directory="/Ambiance"
            selectedFiles={station.ambiance ? [station.ambiance] : []}
            onClick={(evt: any, container: AssetObject) => {
              if (!selectedStationSet || !station.name) return;
              setAmbianceMutation({
                variables: {
                  stationSetID: selectedStationSet,
                  stationName: station.name,
                  ambiance: container.fullPath,
                },
              });
              setEdit(false);
            }}
          />
        </>
      ) : (
        <Button size="sm" color="info" onClick={() => setEdit(true)}>
          Edit Ambiance
        </Button>
      )}
    </>
  );
};
export default AmbianceConfig;
