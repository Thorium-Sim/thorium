import React from "react";
import {
  Col,
  Row,
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
} from "helpers/reactstrap";
import MacroWrapper from "./MacroConfig";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import EventPicker from "./EventPicker";
import MissionConfig from "./MissionConfig";
import EventName from "./EventName";
import {FaBan} from "react-icons/fa";
import {
  useTimelineReorderStepMutation,
  useTimelineUpdateItemMutation,
  useTimelineUpdateStepMutation,
  useTimelineAddItemMutation,
  useTimelineRemoveItemMutation,
  useTimelineDuplicateItemMutation,
} from "generated/graphql";
import {MissionI, TimelineStep} from "./TimelineTypes";
import TimelineStepButtons from "./TimelineStepButtons";
const sortableElement = SortableElement;
const sortableContainer = SortableContainer;

const SortableItem = sortableElement(
  ({
    item,
    selectedTimelineStep,
    setSelectedTimelineStep,
  }: {
    item: TimelineStep;
    selectedTimelineStep: string | null;
    setSelectedTimelineStep: (id: string) => void;
  }) => (
    <li
      key={`${item.id}-timelineStep`}
      onClick={() => setSelectedTimelineStep(item.id)}
      className={`${
        item.id === selectedTimelineStep ? "selected" : ""
      } list-group-item`}
    >
      {item.name}
    </li>
  ),
);

const SortableList = sortableContainer(
  ({
    items,
    setSelectedTimelineStep,
    selectedTimelineStep,
  }: {
    items: TimelineStep[];
    setSelectedTimelineStep: (id: string) => void;
    selectedTimelineStep: string | null;
  }) => {
    return (
      <ul style={{padding: 0}}>
        {items.map((item, index) => {
          return (
            <SortableItem
              key={`${item.id}-timelineStep`}
              index={index}
              item={item}
              selectedTimelineStep={selectedTimelineStep}
              setSelectedTimelineStep={setSelectedTimelineStep}
            />
          );
        })}
      </ul>
    );
  },
);

interface TimelineConfigProps {
  object: MissionI;
  removeMission: () => void;
  updateMission: () => void;
  exportMissionScript: (mission: MissionI) => void;
}

const TimelineConfig: React.FC<TimelineConfigProps> = ({
  object,
  removeMission,
  updateMission,
  exportMissionScript,
}) => {
  const [selectedTimelineStep, setSelectedTimelineStepAction] = React.useState<
    string | null
  >(null);
  const [selectedTimelineItem, setSelectedTimelineItemAction] = React.useState<
    string | null
  >(null);

  const [updateItemMutation] = useTimelineUpdateItemMutation();
  const [updateStepMutation] = useTimelineUpdateStepMutation();
  const [reorderStepMutation] = useTimelineReorderStepMutation();
  const [addItemMutation] = useTimelineAddItemMutation();
  const [removeItemMutation] = useTimelineRemoveItemMutation();
  const [duplicateItemMutation] = useTimelineDuplicateItemMutation();

  const setSelectedTimelineStep = (stepId: string | null) => {
    setSelectedTimelineStepAction(stepId);
    setSelectedTimelineItemAction(null);
  };

  const updateMacro = (type: string, value: any) => {
    if (!selectedTimelineStep || !selectedTimelineItem) return;
    const variables = {
      timelineStepId: selectedTimelineStep,
      timelineItemId: selectedTimelineItem,
      missionId: object.id,
      timelineItem: {[type]: value},
    };

    updateItemMutation({variables});
  };
  const updateStep = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTimelineStep || !selectedTimelineItem) return;
    const variables = {
      timelineStepId: selectedTimelineStep,
      missionId: object.id,
      [type]: e.target.value,
    };
    updateStepMutation({variables});
  };
  const updateItem = (type: string, value: string | number | boolean) => {
    if (!selectedTimelineStep || !selectedTimelineItem) return;
    const variables = {
      timelineStepId: selectedTimelineStep,
      timelineItemId: selectedTimelineItem,
      missionId: object.id,
      timelineItem: {
        [type]: value,
        args: JSON.stringify({}),
      },
    };
    updateItemMutation({variables});
  };

  const addTimelineItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedTimelineStep) return;
    const variables = {
      timelineStepId: selectedTimelineStep,
      missionId: object.id,
      timelineItem: {
        name: e.target.value,
        type: "event",
        event: e.target.value,
      },
    };
    addItemMutation({variables});
  };

  const removeTimelineItem = (timelineItemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedTimelineStep || !selectedTimelineItem) return;
    if (window.confirm("Are you sure you want to remove this timeline item?")) {
      if (timelineItemId === selectedTimelineItem) {
        setSelectedTimelineItemAction(null);
      }

      const variables = {
        timelineStepId: selectedTimelineStep,
        timelineItemId: timelineItemId,
        missionId: object.id,
      };
      removeItemMutation({variables});
    }
  };

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    if (oldIndex === newIndex) {
      setSelectedTimelineStep(object.timeline[oldIndex].id);
    } else {
      const variables = {
        timelineStepId: object.timeline[oldIndex].id,
        order: newIndex,
        missionId: object.id,
      };

      reorderStepMutation({variables});
    }
  };

  const selectedStep = object.timeline.find(e => e.id === selectedTimelineStep);
  return (
    <Row>
      <Col sm="3">
        <h4>Timeline</h4>
        <Card className="scroll" style={{maxHeight: "60vh", overflowY: "auto"}}>
          <div
            className="list-group-item"
            onClick={() => setSelectedTimelineStep("mission")}
          >
            Mission Information
          </div>
          <SortableList
            items={object.timeline}
            onSortEnd={onSortEnd}
            selectedTimelineStep={selectedTimelineStep}
            setSelectedTimelineStep={setSelectedTimelineStep}
          />
        </Card>
        <TimelineStepButtons
          mission={object}
          setSelectedTimelineStep={setSelectedTimelineStep}
          selectedTimelineStep={selectedTimelineStep}
          removeMission={removeMission}
          exportMissionScript={exportMissionScript}
        />
      </Col>
      {selectedTimelineStep === "mission" && (
        <Col sm={6}>
          <MissionConfig mission={object} updateMission={updateMission} />
        </Col>
      )}
      {selectedTimelineStep &&
        selectedTimelineStep !== "mission" &&
        selectedStep && (
          <Col sm="3" style={{maxHeight: "27vh"}}>
            <h4>{selectedStep.name}</h4>
            <Card
              className="scroll"
              style={{maxHeight: "60vh", overflowY: "auto"}}
            >
              <li
                onClick={() => setSelectedTimelineItemAction("step")}
                className={`${
                  selectedTimelineItem === "step" ? "selected" : ""
                } list-group-item`}
              >
                Edit Step
              </li>
              {selectedStep.timelineItems.map(e => {
                return (
                  <li
                    key={`${selectedStep.id}-${e.id}`}
                    onClick={() => setSelectedTimelineItemAction(e.id)}
                    className={`${
                      e.id === selectedTimelineItem ? "selected" : ""
                    } list-group-item ${
                      e.needsConfig ? "list-group-item-warning" : ""
                    }`}
                  >
                    <EventName id={e.event} />{" "}
                    <FaBan
                      className="text-danger pull-right"
                      onClick={evt => removeTimelineItem(e.id, evt)}
                    />
                  </li>
                );
              })}
            </Card>
            {selectedTimelineItem && (
              <Button
                size="sm"
                color="success"
                onClick={async () => {
                  const res = await duplicateItemMutation({
                    variables: {
                      missionId: object.id,
                      timelineStepId: selectedTimelineStep,
                      timelineItemId: selectedTimelineItem,
                    },
                  });
                  setSelectedTimelineItemAction(
                    res.data?.timelineDuplicateItem || null,
                  );
                }}
              >
                Duplicate Selected Action
              </Button>
            )}
            <EventPicker
              className={"btn btn-sm btn-success"}
              handleChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                addTimelineItem(e)
              }
            />
          </Col>
        )}
      {(() => {
        if (selectedTimelineItem === "step") {
          const step = object.timeline.find(e => e.id === selectedTimelineStep);
          if (!step) return null;
          return (
            <Col sm="6">
              <FormGroup>
                <Label>Step Name</Label>
                <Input
                  type="text"
                  key={step.id}
                  defaultValue={step && step.name}
                  onChange={e => updateStep("name", e)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Step Description</Label>
                <Input
                  type="textarea"
                  rows={8}
                  key={step.id}
                  defaultValue={step.description}
                  placeholder="Here is where you would explain what is going on during this part of the mission. This serves as your script, explaining what actions should be taken and where the story goes next."
                  onChange={e => updateStep("description", e)}
                />
              </FormGroup>
            </Col>
          );
        } else if (selectedTimelineItem) {
          const step = object.timeline.find(e => e.id === selectedTimelineStep);
          if (!step) return null;
          const item = step.timelineItems.find(
            t => t.id === selectedTimelineItem,
          );
          if (!item) return null;
          return (
            <Col sm="6" key={item.id}>
              <EventName id={item.event} />{" "}
              <Card
                className="scroll"
                style={{overflowY: "auto", maxHeight: "75vh"}}
              >
                <CardBody>
                  <FormGroup>
                    <Label>Item Delay (in milliseconds)</Label>
                    <Input
                      type="number"
                      defaultValue={item.delay}
                      onBlur={e =>
                        updateItem("delay", parseInt(e.target.value))
                      }
                    />
                  </FormGroup>
                  <FormGroup style={{marginLeft: "5ch"}}>
                    <Label>
                      <Input
                        type="checkbox"
                        defaultChecked={item.noCancelOnReset}
                        onBlur={e =>
                          updateItem("noCancelOnReset", e.target.checked)
                        }
                      />
                      Don't Cancel Delay on Flight Reset
                    </Label>
                  </FormGroup>
                  <MacroWrapper
                    id={item.id}
                    delay={item.delay}
                    steps={object.timeline}
                    currentStep={selectedTimelineStep}
                    event={item.event}
                    args={item.args}
                    updateMacro={updateMacro}
                  />
                </CardBody>
              </Card>
            </Col>
          );
        }
      })()}
    </Row>
  );
};

export default TimelineConfig;
