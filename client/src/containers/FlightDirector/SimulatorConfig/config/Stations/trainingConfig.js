import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { Button } from "reactstrap";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
import gql from "graphql-tag";

class TrainingConfig extends Component {
  state = {};
  render() {
    const { selectedStationSet, station } = this.props;
    const { edit } = this.state;
    return (
      <Fragment>
        <label>Training: {station.training || "None"}</label>
        {edit ? (
          <Mutation
            mutation={gql`
              mutation SetTraining(
                $stationSetID: ID!
                $stationName: String!
                $training: String!
              ) {
                setStationTraining(
                  stationSetID: $stationSetID
                  stationName: $stationName
                  training: $training
                )
              }
            `}
          >
            {action => (
              <Fragment>
                <Button
                  color="info"
                  size="sm"
                  onClick={() => this.setState({ edit: false })}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  color="warning"
                  onClick={() => {
                    action({
                      variables: {
                        stationSetID: selectedStationSet,
                        stationName: station.name,
                        training: ""
                      }
                    });
                    this.setState({ edit: false });
                  }}
                >
                  Clear Training
                </Button>
                <FileExplorer
                  directory="/Training"
                  selectedFiles={[station.training]}
                  onClick={(evt, container) => {
                    action({
                      variables: {
                        stationSetID: selectedStationSet,
                        stationName: station.name,
                        training: container.fullPath
                      }
                    });
                    this.setState({ edit: false });
                  }}
                />
              </Fragment>
            )}
          </Mutation>
        ) : (
          <Button
            size="sm"
            color="info"
            onClick={() => this.setState({ edit: true })}
          >
            Edit Training
          </Button>
        )}
      </Fragment>
    );
  }
}
export default TrainingConfig;
