import React, {Fragment} from "react";
import {Card, Button, ButtonGroup} from "helpers/reactstrap";
import ops from "./ops";
import {useApolloClient} from "@apollo/client";
import {Simulator, useStationSetDuplicateMutation} from "generated/graphql";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";

interface SimulatorConfigProps {
  sim: Simulator;
}
const SimulatorConfigView: React.FC<SimulatorConfigProps> = ({sim}) => {
  const {subPath1: selectedStationSet} = useParams();
  const navigate = useNavigate();
  function setStationSet(stationSet: string) {
    navigate(`${selectedStationSet ? "../" : ""}${stationSet}`);
  }

  const client = useApolloClient();
  const createStationSet = () => {
    let name = prompt(
      "What is the station set name? eg. 12-Standard, 8-School, etc.",
    );
    if (name) {
      const variables = {
        id: sim.id,
        name,
      };
      client.mutate({
        mutation: ops.create,
        variables,
      });
    }
  };
  const renameStationSet = () => {
    let name = prompt(
      "What is the new station set name? eg. 12-Standard, 8-School, etc.",
    );
    if (name) {
      const variables = {
        id: selectedStationSet,
        name,
      };
      client.mutate({
        mutation: ops.rename,
        variables,
      });
    }
  };
  const removeStationSet = () => {
    const variables = {
      id: selectedStationSet,
    };
    client.mutate({
      mutation: ops.remove,
      variables,
    });
  };
  const [duplicate] = useStationSetDuplicateMutation();
  const {stationSets} = sim;
  return (
    <Fragment>
      <h4>Station Sets</h4>
      <Card className="scroll">
        {stationSets?.map(s => (
          <li
            key={s?.id || ""}
            className={`list-group-item ${
              selectedStationSet === s?.id ? "selected" : ""
            }`}
            onClick={() => setStationSet(s?.id || "")}
          >
            {s?.name}
          </li>
        ))}
      </Card>

      <Button onClick={createStationSet} size="sm" block color="success">
        Add
      </Button>
      <label>
        <div className="btn btn-sm btn-info btn-block">Import Station Set</div>
        <input
          hidden
          type="file"
          onChange={evt => {
            if (evt?.target?.files?.[0]) {
              const data = new FormData();
              Array.from(evt.target.files).forEach((f, index) =>
                data.append(`files[${index}]`, f),
              );
              fetch(`/importStationSets`, {
                method: "POST",
                body: data,
              }).then(() => {
                window.location.reload();
              });
            }
          }}
        />
      </label>
      <ButtonGroup>
        {selectedStationSet && (
          <>
            <Button onClick={renameStationSet} size="sm" color="warning">
              Rename
            </Button>

            <Button onClick={removeStationSet} size="sm" color="danger">
              Remove
            </Button>

            <Button
              onClick={() => {
                const name = prompt("What is the name of the new station set?");
                if (!name) return;
                duplicate({
                  variables: {stationSetID: selectedStationSet, name},
                }).then(res => {
                  setStationSet(res.data?.duplicateStationSet || "");
                });
              }}
              size="sm"
              color="info"
            >
              Duplicate
            </Button>

            <Button
              tag="a"
              href={`/exportStationSets/${selectedStationSet}`}
              color="secondary"
              block
              size="sm"
            >
              Export
            </Button>
          </>
        )}
      </ButtonGroup>
    </Fragment>
  );
};

export default SimulatorConfigView;
