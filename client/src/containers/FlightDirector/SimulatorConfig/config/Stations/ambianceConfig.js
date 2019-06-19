import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { Button } from "reactstrap";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
import gql from "graphql-tag.macro";

class AmbianceConfig extends Component {
  state = {};
  render() {
    const { selectedStationSet, station } = this.props;
    const { edit } = this.state;
    return (
      <Fragment>
        <label>Ambiance: {station.ambiance || "None"}</label>
        {edit ? (
          <Mutation
            mutation={gql`
              mutation SetAmbiance(
                $stationSetID: ID!
                $stationName: String!
                $ambiance: String
              ) {
                setStationAmbiance(
                  stationSetID: $stationSetID
                  stationName: $stationName
                  ambiance: $ambiance
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
                        ambiance: ""
                      }
                    });
                    this.setState({ edit: false });
                  }}
                >
                  Clear Ambiance
                </Button>
                <FileExplorer
                  directory="/Ambiance"
                  selectedFiles={[station.ambiance]}
                  onClick={(evt, container) => {
                    action({
                      variables: {
                        stationSetID: selectedStationSet,
                        stationName: station.name,
                        ambiance: container.fullPath
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
            Edit Ambiance
          </Button>
        )}
      </Fragment>
    );
  }
}
export default AmbianceConfig;
