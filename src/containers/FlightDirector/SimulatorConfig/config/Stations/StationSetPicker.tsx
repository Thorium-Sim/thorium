import React, {Component, Fragment} from "react";
import {Card, Button, ButtonGroup} from "helpers/reactstrap";
import ops, {mutationKeys} from "./ops";
import {useApolloClient} from "@apollo/client";
import {Simulator} from "generated/graphql";
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
      <ButtonGroup>
        {selectedStationSet && (
          <Button onClick={renameStationSet} size="sm" color="warning">
            Rename
          </Button>
        )}
        {selectedStationSet && (
          <Button onClick={removeStationSet} size="sm" color="danger">
            Remove
          </Button>
        )}
      </ButtonGroup>
    </Fragment>
  );
};

export default SimulatorConfigView;
