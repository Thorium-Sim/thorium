import React from "react";
import {Button} from "helpers/reactstrap";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
import {
  Station,
  useStationSetTrainingMutation,
  AssetObject,
} from "generated/graphql";
import {useParams} from "react-router";

interface TrainingConfigProps {
  station: Station;
}

const TrainingConfig: React.FC<TrainingConfigProps> = ({station}) => {
  const {subPath1: selectedStationSet} = useParams();
  const [edit, setEdit] = React.useState(false);

  const [setTrainingMutation] = useStationSetTrainingMutation();

  return (
    <>
      <label>Training: {station.training || "None"}</label>
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
              setTrainingMutation({
                variables: {
                  stationSetID: selectedStationSet,
                  stationName: station.name,
                  training: "",
                },
              });
              setEdit(false);
            }}
          >
            Clear Training
          </Button>
          <FileExplorer
            directory="/Training"
            selectedFiles={station.training ? [station.training] : []}
            onClick={(evt: any, container: AssetObject) => {
              if (!selectedStationSet || !station.name) return;
              setTrainingMutation({
                variables: {
                  stationSetID: selectedStationSet,
                  stationName: station.name,
                  training: container.fullPath,
                },
              });
              setEdit(false);
            }}
          />
        </>
      ) : (
        <Button size="sm" color="info" onClick={() => setEdit(true)}>
          Edit Training
        </Button>
      )}
    </>
  );
};
export default TrainingConfig;
