import React, { Fragment, Component } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  ButtonGroup,
  CardBody,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import MacroWrapper from "./MacroConfig";
import gql from "graphql-tag";
import FontAwesome from "react-fontawesome";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import EventPicker from "./EventPicker";
import { macroNames } from "./PrintMission";
import MissionConfig from "./MissionConfig";
import EventName from "./EventName";

const sortableElement = SortableElement;
const sortableContainer = SortableContainer;

const SortableItem = sortableElement(
  ({ item, selectedTimelineStep, setSelectedTimelineStep }) => (
    <li
      key={`${item.id}-timelineStep`}
      onClick={setSelectedTimelineStep.bind(this, item)}
      className={`${
        item.id === selectedTimelineStep ? "selected" : ""
      } list-group-item`}
    >
      {item.name}
    </li>
  )
);

const SortableList = sortableContainer(
  ({
    items,
    setSelectedTimelineStep,
    removeTimelineStep,
    selectedTimelineStep
  }) => {
    return (
      <ul style={{ padding: 0 }}>
        {items.map((item, index) => {
          return (
            <SortableItem
              key={`${item.id}-timelineStep`}
              index={index}
              item={item}
              selectedTimelineStep={selectedTimelineStep}
              setSelectedTimelineStep={setSelectedTimelineStep}
              removeTimelineStep={removeTimelineStep}
            />
          );
        })}
      </ul>
    );
  }
);

export default class TimelineConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTimelineStep: null,
      selectedTimelineItem: null
    };
  }
  _setSelectedTimelineStep = timeline => {
    this.setState({
      selectedTimelineStep: timeline.id,
      selectedTimelineItem: null
    });
  };
  _setSelectedTimelineItem(timelineStep) {
    this.setState({
      selectedTimelineItem: timelineStep.id
    });
  }
  _updateMacro(type, value) {
    let obj = {
      timelineStepId: this.state.selectedTimelineStep,
      timelineItemId: this.state.selectedTimelineItem
    };
    if (this.props.type === "mission") {
      obj.missionId = this.props.object.id;
    } else {
      obj.simulatorId = this.props.object.id;
    }
    let timelineItem = {};
    timelineItem[type] = value;
    obj.timelineItem = timelineItem;

    this.props.client.mutate({
      mutation: gql`
        mutation UpdateTimelineItem(
          $simulatorId: ID
          $missionId: ID
          $timelineStepId: ID!
          $timelineItemId: ID!
          $timelineItem: TimelineitemInput!
        ) {
          updateTimelineStepItem(
            simulatorId: $simulatorId
            missionId: $missionId
            timelineStepId: $timelineStepId
            timelineItemId: $timelineItemId
            updateTimelineItem: $timelineItem
          )
        }
      `,
      variables: obj
    });
  }
  _updateStep(type, e) {
    let obj = {
      timelineStepId: this.state.selectedTimelineStep
    };
    if (this.props.type === "mission") {
      obj.missionId = this.props.object.id;
    } else {
      obj.simulatorId = this.props.object.id;
    }
    obj[type] = e.target.value;
    this.props.client.mutate({
      mutation: gql`
        mutation UpdateTimelineStep(
          $simulatorId: ID
          $missionId: ID
          $timelineStepId: ID!
          $name: String
          $description: String
        ) {
          updateTimelineStep(
            simulatorId: $simulatorId
            missionId: $missionId
            timelineStepId: $timelineStepId
            name: $name
            description: $description
          )
        }
      `,
      variables: obj
    });
  }
  _updateItem(type, e) {
    let obj = {
      timelineStepId: this.state.selectedTimelineStep,
      timelineItemId: this.state.selectedTimelineItem
    };
    if (this.props.type === "mission") {
      obj.missionId = this.props.object.id;
    } else {
      obj.simulatorId = this.props.object.id;
    }
    let timelineItem = {};
    timelineItem[type] = e.target.value;
    if (type === "event") {
      // Reset the args
      timelineItem.args = JSON.stringify({});
    }
    obj.timelineItem = timelineItem;

    this.props.client.mutate({
      mutation: gql`
        mutation UpdateTimelineItem(
          $simulatorId: ID
          $missionId: ID
          $timelineStepId: ID!
          $timelineItemId: ID!
          $timelineItem: TimelineitemInput!
        ) {
          updateTimelineStepItem(
            simulatorId: $simulatorId
            missionId: $missionId
            timelineStepId: $timelineStepId
            timelineItemId: $timelineItemId
            updateTimelineItem: $timelineItem
          )
        }
      `,
      variables: obj
    });
  }
  _addTimelineStep = async inserted => {
    const name = prompt("What is the name of the timeline step?");
    const mutation = gql`
      mutation AddTimelineStep(
        $simulatorId: ID
        $missionId: ID
        $name: String!
        $description: String
      ) {
        addTimelineStep(
          simulatorId: $simulatorId
          missionId: $missionId
          name: $name
          description: $description
        )
      }
    `;
    if (name) {
      const obj = {
        name
      };
      if (this.props.type === "mission") {
        obj.missionId = this.props.object.id;
      } else {
        obj.simulatorId = this.props.object.id;
      }
      const res = await this.props.client.mutate({
        mutation: mutation,
        variables: obj
      });
      if (!res) return;
      const stepId = res.data.addTimelineStep;
      if (!inserted) {
        this.setState({ selectedTimelineStep: stepId });
      }
      return stepId;
    }
  };
  insertTimelineStep = async () => {
    const stepId = await this._addTimelineStep(true);
    if (!stepId) return;
    const newIndex =
      this.props.object.timeline.findIndex(
        s => s.id === this.state.selectedTimelineStep
      ) + 1;
    const obj = {
      missionId: this.props.object.id,
      timelineStepId: stepId,
      order: newIndex
    };
    const mutation = gql`
      mutation ReorderTimelineStep(
        $missionId: ID
        $timelineStepId: ID!
        $order: Int!
      ) {
        reorderTimelineStep(
          missionId: $missionId
          timelineStepId: $timelineStepId
          order: $order
        )
      }
    `;
    this.props.client.mutate({
      mutation: mutation,
      variables: obj
    });
    this.setState({ selectedTimelineStep: stepId });
  };
  _addTimelineItem = e => {
    const mutation = gql`
      mutation AddTimelineItem(
        $simulatorId: ID
        $missionId: ID
        $timelineStepId: ID!
        $timelineItem: TimelineitemInput!
      ) {
        addTimelineItemToTimelineStep(
          simulatorId: $simulatorId
          missionId: $missionId
          timelineStepId: $timelineStepId
          timelineItem: $timelineItem
        )
      }
    `;
    const obj = {
      timelineStepId: this.state.selectedTimelineStep
    };
    if (this.props.type === "mission") {
      obj.missionId = this.props.object.id;
    } else {
      obj.simulatorId = this.props.object.id;
    }
    let timelineItem = {
      name: macroNames[e.target.value],
      type: "event",
      event: e.target.value
    };
    obj.timelineItem = timelineItem;
    this.props.client.mutate({
      mutation: mutation,
      variables: obj
    });
  };
  _removeTimelineStep(timelineStep, e) {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this timeline step?")) {
      if (timelineStep === this.state.selectedTimelineStep) {
        this.setState({
          selectedTimelineStep: null,
          selectedTimelineItem: null
        });
      }
      const mutation = gql`
        mutation RemoveTimelineStep(
          $simulatorId: ID
          $missionId: ID
          $timelineStepId: ID!
        ) {
          removeTimelineStep(
            simulatorId: $simulatorId
            missionId: $missionId
            timelineStepId: $timelineStepId
          )
        }
      `;
      const obj = {
        timelineStepId: timelineStep
      };
      if (this.props.type === "mission") {
        obj.missionId = this.props.object.id;
      } else {
        obj.simulatorId = this.props.object.id;
      }
      this.props.client.mutate({
        mutation: mutation,
        variables: obj
      });
    }
  }
  _removeTimelineItem(timelineItem, e) {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this timeline item?")) {
      if (timelineItem.id === this.state.selectedTimelineItem) {
        this.setState({
          selectedTimelineItem: null
        });
      }
      const mutation = gql`
        mutation RemoveTimelineItem(
          $simulatorId: ID
          $missionId: ID
          $timelineStepId: ID!
          $timelineItemId: ID!
        ) {
          removeTimelineStepItem(
            simulatorId: $simulatorId
            missionId: $missionId
            timelineStepId: $timelineStepId
            timelineItemId: $timelineItemId
          )
        }
      `;
      const obj = {
        timelineStepId: this.state.selectedTimelineStep,
        timelineItemId: timelineItem.id
      };
      if (this.props.type === "mission") {
        obj.missionId = this.props.object.id;
      } else {
        obj.simulatorId = this.props.object.id;
      }
      this.props.client.mutate({
        mutation: mutation,
        variables: obj
      });
    }
  }
  _duplicateTimelineStep = () => {
    const { selectedTimelineStep: timelineStepId } = this.state;
    const { id: missionId } = this.props.object;

    const mutation = gql`
      mutation DuplicateTimelineStep($missionId: ID!, $timelineStepId: ID!) {
        duplicateTimelineStep(
          missionId: $missionId
          timelineStepId: $timelineStepId
        )
      }
    `;
    this.props.client.mutate({
      mutation: mutation,
      variables: { missionId, timelineStepId }
    });
  };
  onSortEnd({ oldIndex, newIndex }) {
    if (oldIndex === newIndex) {
      this.setState({
        selectedTimelineStep: this.props.object.timeline[oldIndex].id
      });
    } else {
      const obj = {
        timelineStepId: this.props.object.timeline[oldIndex].id,
        order: newIndex
      };
      const mutation = gql`
        mutation ReorderTimelineStep(
          $simulatorId: ID
          $missionId: ID
          $timelineStepId: ID!
          $order: Int!
        ) {
          reorderTimelineStep(
            simulatorId: $simulatorId
            missionId: $missionId
            timelineStepId: $timelineStepId
            order: $order
          )
        }
      `;
      if (this.props.type === "mission") {
        obj.missionId = this.props.object.id;
      } else {
        obj.simulatorId = this.props.object.id;
      }
      this.props.client.mutate({
        mutation: mutation,
        variables: obj
      });
    }
  }
  render() {
    const {
      object,
      removeMission,
      updateMission,
      exportMissionScript
    } = this.props;
    const selectedStep = object.timeline.find(
      e => e.id === this.state.selectedTimelineStep
    );
    return (
      <Row>
        <Col sm="3">
          <h4>Timeline</h4>
          <Card
            className="scroll"
            style={{ maxHeight: "60vh", overflowY: "auto" }}
          >
            <div
              className="list-group-item"
              onClick={() =>
                this.setState({
                  selectedTimelineStep: "mission",
                  selectedTimelineItem: null
                })
              }
            >
              Mission Information
            </div>
            <SortableList
              items={object.timeline}
              onSortEnd={this.onSortEnd.bind(this)}
              selectedTimelineStep={this.state.selectedTimelineStep}
              setSelectedTimelineStep={this._setSelectedTimelineStep}
              removeTimelineStep={this._removeTimelineStep.bind(this)}
            />
          </Card>
          <ButtonGroup>
            <Button color="success" size="sm" onClick={this._addTimelineStep}>
              Add Step
            </Button>

            {this.state.selectedTimelineStep &&
              this.state.selectedTimelineStep !== "mission" && (
                <Fragment>
                  <Button
                    color="warning"
                    size="sm"
                    onClick={this.insertTimelineStep}
                  >
                    Insert Step
                  </Button>
                  <Button
                    color="info"
                    size="sm"
                    onClick={this._duplicateTimelineStep}
                  >
                    Duplicate
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={this._removeTimelineStep.bind(
                      this,
                      this.state.selectedTimelineStep
                    )}
                  >
                    Remove
                  </Button>
                </Fragment>
              )}
          </ButtonGroup>

          <Button
            tag="a"
            size="sm"
            href={`${window.location.protocol}//${
              window.location.hostname
            }:${parseInt(window.location.port, 10) + 1}/exportMission/${
              object.id
            }`}
            block
            color="info"
          >
            Export Mission
          </Button>
          <Button
            color="warning"
            size="sm"
            block
            onClick={() => exportMissionScript(object)}
          >
            Export Mission Script
          </Button>
          <Button block onClick={removeMission} size="sm" color="danger">
            Remove Mission
          </Button>
        </Col>
        {this.state.selectedTimelineStep === "mission" && (
          <Col sm={6}>
            <MissionConfig mission={object} updateMission={updateMission} />
          </Col>
        )}
        {this.state.selectedTimelineStep &&
          this.state.selectedTimelineStep !== "mission" &&
          selectedStep && (
            <Col sm="3" style={{ maxHeight: "27vh" }}>
              <h4>{selectedStep.name}</h4>
              <Card
                className="scroll"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
                <li
                  onClick={this._setSelectedTimelineItem.bind(this, {
                    id: "step"
                  })}
                  className={`${
                    this.state.selectedTimelineItem === "step" ? "selected" : ""
                  } list-group-item`}
                >
                  Edit Step
                </li>
                {selectedStep.timelineItems.map(e => {
                  return (
                    <li
                      key={`${selectedStep.id}-${e.id}`}
                      onClick={this._setSelectedTimelineItem.bind(this, e)}
                      className={`${
                        e.id === this.state.selectedTimelineItem
                          ? "selected"
                          : ""
                      } list-group-item`}
                    >
                      <EventName id={e.event} />{" "}
                      <FontAwesome
                        name="ban"
                        className="text-danger pull-right"
                        onClick={this._removeTimelineItem.bind(this, e)}
                      />
                    </li>
                  );
                })}
              </Card>
              <EventPicker
                className={"btn btn-sm btn-success"}
                handleChange={e => this._addTimelineItem(e)}
              />
            </Col>
          )}
        {(() => {
          if (this.state.selectedTimelineItem === "step") {
            const step = object.timeline.find(
              e => e.id === this.state.selectedTimelineStep
            );
            return (
              <Col sm="6">
                <FormGroup>
                  <Label>Step Name</Label>
                  <Input
                    type="text"
                    defaultValue={step && step.name}
                    onChange={this._updateStep.bind(this, "name")}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Step Description</Label>
                  <Input
                    type="textarea"
                    rows={8}
                    defaultValue={step.description}
                    placeholder="Here is where you would explain what is going on during this part of the mission. This serves as your script, explaining what actions should be taken and where the story goes next."
                    onChange={this._updateStep.bind(this, "description")}
                  />
                </FormGroup>
              </Col>
            );
          } else if (this.state.selectedTimelineItem) {
            const step = object.timeline.find(
              e => e.id === this.state.selectedTimelineStep
            );
            if (!step) return null;
            const item = step.timelineItems.find(
              t => t.id === this.state.selectedTimelineItem
            );
            if (!item) return null;
            return (
              <Col sm="6" key={item.id}>
                <EventName id={item.event} />{" "}
                <Card className="scroll" style={{ maxHeight: "75vh" }}>
                  <CardBody>
                    <FormGroup>
                      <Label>Item Delay (in milliseconds)</Label>
                      <Input
                        type="number"
                        value={item.delay}
                        onChange={this._updateItem.bind(this, "delay")}
                      />
                    </FormGroup>
                    <MacroWrapper
                      event={item.event}
                      args={item.args}
                      updateMacro={this._updateMacro.bind(this)}
                    />
                  </CardBody>
                </Card>
              </Col>
            );
          }
        })()}
      </Row>
    );
  }
}
