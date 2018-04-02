import React, { Component } from "react";
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

const SortableItem = SortableElement(
  ({
    item,
    selectedTimelineStep,
    setSelectedTimelineStep,
    removeTimelineStep
  }) => (
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

const SortableList = SortableContainer(
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.object.id !== this.props.object.id) {
      this.setState({
        selectedTimelineStep: null,
        selectedTimelineItem: null
      });
    }
  }
  _setSelectedTimelineStep(timeline) {
    this.setState({
      selectedTimelineStep: timeline.id,
      selectedTimelineItem: null
    });
  }
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
      timelineItem["args"] = JSON.stringify({});
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
  _addTimelineStep() {
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
      this.props.client.mutate({
        mutation: mutation,
        variables: obj
      });
    }
  }
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
      name: e.target.value,
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
    const { object } = this.props;
    return (
      <Row>
        <Col sm="3">
          <h4>Timeline</h4>
          <Card
            className="scroll"
            style={{ maxHeight: "60vh", overflowY: "scroll" }}
          >
            <SortableList
              items={object.timeline}
              onSortEnd={this.onSortEnd.bind(this)}
              selectedTimelineStep={this.state.selectedTimelineStep}
              setSelectedTimelineStep={this._setSelectedTimelineStep.bind(this)}
              removeTimelineStep={this._removeTimelineStep.bind(this)}
            />
          </Card>
          <ButtonGroup>
            <Button
              color="success"
              size="sm"
              onClick={this._addTimelineStep.bind(this)}
            >
              Add Step
            </Button>
            {this.state.selectedTimelineStep && (
              <Button
                color="danger"
                size="sm"
                onClick={this._removeTimelineStep.bind(
                  this,
                  this.state.selectedTimelineStep
                )}
              >
                Remove Step
              </Button>
            )}
          </ButtonGroup>
        </Col>
        {this.state.selectedTimelineStep && (
          <Col sm="3" style={{ maxHeight: "27vh" }}>
            <h4>
              {
                object.timeline.find(
                  e => e.id === this.state.selectedTimelineStep
                ).name
              }
            </h4>
            <Card className="scroll">
              <li
                onClick={this._setSelectedTimelineItem.bind(this, {
                  id: "step"
                })}
                className={`${
                  "step" === this.state.selectedTimelineItem ? "selected" : ""
                } list-group-item`}
              >
                Edit Step
              </li>
              {object.timeline
                .find(e => e.id === this.state.selectedTimelineStep)
                .timelineItems.map(e => {
                  return (
                    <li
                      key={`${object.timeline.find(
                        e => e.id === this.state.selectedTimelineStep
                      )}-${e.id}`}
                      onClick={this._setSelectedTimelineItem.bind(this, e)}
                      className={`${
                        e.id === this.state.selectedTimelineItem
                          ? "selected"
                          : ""
                      } list-group-item`}
                    >
                      {e.name}{" "}
                      <FontAwesome
                        name="ban"
                        className="text-danger pull-right"
                        onClick={this._removeTimelineItem.bind(this, e)}
                      />
                    </li>
                  );
                })}
              <EventPicker
                className={"btn btn-sm btn-success"}
                handleChange={e => this._addTimelineItem(e)}
              />
            </Card>
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
                    defaultValue={step.name}
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
            const item = object.timeline
              .find(e => e.id === this.state.selectedTimelineStep)
              .timelineItems.find(
                t => t.id === this.state.selectedTimelineItem
              );
            if (!item) return null;
            return (
              <Col sm="6">
                <h4>{item.event}</h4>
                <Card className="scroll" style={{ maxHeight: "60vh" }}>
                  <CardBody>
                    <FormGroup>
                      <Label>Item Name</Label>
                      <Input type="text" value={item.event} readOnly />
                    </FormGroup>
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
