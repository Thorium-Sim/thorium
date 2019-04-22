import React, { Component, Fragment } from "react";
import { Label, Input, Button } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import FontAwesome from "react-fontawesome";

const defaultGroups = ["SecurityTeams", "DamageTeams", "MedicalTeams"];
class ExtraMessageGroups extends Component {
  state = { textInput: "" };
  addGroup = action => () => {
    const { textInput } = this.state;
    if (!textInput) return;
    const { stationSetId, station } = this.props;
    action({
      variables: { stationSetId, station, group: textInput, state: true }
    });
    this.setState({ textInput: "" });
  };
  render() {
    const { textInput } = this.state;
    const { stationSetId, station, messageGroups } = this.props;
    return (
      <Mutation
        mutation={gql`
          mutation ToggleMessageGroup(
            $stationSetId: ID!
            $station: String!
            $group: String!
            $state: Boolean!
          ) {
            toggleStationMessageGroup(
              stationSetId: $stationSetId
              station: $station
              group: $group
              state: $state
            )
          }
        `}
      >
        {action => (
          <Fragment>
            <div>
              <Label>
                Extra Message Groups
                <Input
                  type="text"
                  value={textInput}
                  onChange={e => this.setState({ textInput: e.target.value })}
                />
              </Label>

              <Button color="success" size="sm" onClick={this.addGroup(action)}>
                Add Group
              </Button>
            </div>
            <div>
              {messageGroups
                .filter(m => defaultGroups.indexOf(m) === -1)
                .map(m => (
                  <p key={m}>
                    {m}{" "}
                    <FontAwesome
                      name="ban"
                      className="text-danger"
                      onClick={() =>
                        action({
                          variables: {
                            stationSetId,
                            station,
                            group: m,
                            state: false
                          }
                        })
                      }
                    />
                  </p>
                ))}
            </div>
          </Fragment>
        )}
      </Mutation>
    );
  }
}
export default ExtraMessageGroups;
