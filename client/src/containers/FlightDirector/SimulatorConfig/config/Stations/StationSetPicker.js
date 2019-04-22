import React, { Component, Fragment } from "react";
import { Card, Button, ButtonGroup } from "reactstrap";
import ops from "./ops";

class SimulatorConfigView extends Component {
  state = {};
  _handleChange = e => {
    const variables = {
      id: this.props.sim.id,
      value: e.target.value
    };
    const mutation = ops[e.target.name];
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  createStationSet = () => {
    let name = prompt(
      "What is the station set name? eg. 12-Standard, 8-School, etc."
    );
    if (name) {
      const variables = {
        id: this.props.sim.id,
        name
      };
      this.props.client.mutate({
        mutation: ops.create,
        variables
      });
    }
  };
  renameStationSet = () => {
    let name = prompt(
      "What is the new station set name? eg. 12-Standard, 8-School, etc."
    );
    if (name) {
      const variables = {
        id: this.props.selectedStationSet,
        name
      };
      this.props.client.mutate({
        mutation: ops.rename,
        variables
      });
    }
  };
  removeStationSet = () => {
    const variables = {
      id: this.props.selectedStationSet
    };
    this.props.client.mutate({
      mutation: ops.remove,
      variables
    });
  };
  render() {
    const { sim, selectedStationSet, setStationSet } = this.props;
    const { stationSets } = sim;
    return (
      <Fragment>
        <h4>Station Sets</h4>
        <Card className="scroll">
          {stationSets.map(s => (
            <li
              key={s.id}
              className={`list-group-item ${
                selectedStationSet === s.id ? "selected" : ""
              }`}
              onClick={() => setStationSet(s.id)}
            >
              {s.name}
            </li>
          ))}
        </Card>

        <Button onClick={this.createStationSet} size="sm" block color="success">
          Add
        </Button>
        <ButtonGroup>
          {selectedStationSet && (
            <Button onClick={this.renameStationSet} size="sm" color="warning">
              Rename
            </Button>
          )}
          {selectedStationSet && (
            <Button onClick={this.removeStationSet} size="sm" color="danger">
              Remove
            </Button>
          )}
        </ButtonGroup>
      </Fragment>
    );
  }
}

export default SimulatorConfigView;
