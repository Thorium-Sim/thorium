import React, {ReactNode} from "react";
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
  useTimelineReorderItemMutation,
  Mission,
  TimelineStep,
  TimelineItem,
  Station,
  Client,
} from "generated/graphql";
import TimelineStepButtons from "./TimelineStepButtons";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
const sortableElement = SortableElement;
const sortableContainer = SortableContainer;

const SortableItem = sortableElement(
  ({
    item,
    renderItem,
  }: {
    item: TimelineStep | TimelineItem;
    renderItem: (item: TimelineStep | TimelineItem) => any;
  }) => renderItem(item),
);

const SortableList = sortableContainer(
  ({
    items,
    renderItem,
  }: {
    items: (TimelineStep | TimelineItem)[];
    renderItem: (item: TimelineStep | TimelineItem) => ReactNode;
  }) => {
    return (
      <ul style={{padding: 0}}>
        {items.map((item, index) => {
          return (
            <SortableItem
              key={`${item.id}-timelineStep`}
              index={index}
              // @ts-expect-error
              item={item}
              renderItem={renderItem}
            />
          );
        })}
      </ul>
    );
  },
);

export const TimelineMacroConfig: React.FC<{
  missionId: string;
  timeline: TimelineStep[];
  selectedTimelineStep: string;
  selectedTimelineItem: string;
  stations?: Station[];
  clients?: Client[];
  omitName?: boolean;
}> = ({
  missionId,
  timeline,
  selectedTimelineItem,
  selectedTimelineStep,
  stations,
  clients,
  omitName,
}) => {
  const [updateItemMutation] = useTimelineUpdateItemMutation();

  const updateMacro = (type: string, value: any) => {
    if (!selectedTimelineStep || !selectedTimelineItem) return;
    const variables = {
      timelineStepId: selectedTimelineStep,
      timelineItemId: selectedTimelineItem,
      missionId,
      timelineItem: {[type]: value},
    };

    updateItemMutation({variables});
  };

  const updateItem = (type: string, value: string | number | boolean) => {
    if (!selectedTimelineStep || !selectedTimelineItem) return;
    const variables = {
      timelineStepId: selectedTimelineStep,
      timelineItemId: selectedTimelineItem,
      missionId,
      timelineItem: {
        [type]: value,
        args: JSON.stringify({}),
      },
    };
    updateItemMutation({variables});
  };

  const step = timeline.find(e => e.id === selectedTimelineStep);
  if (!step) return null;
  const item = step.timelineItems.find(t => t.id === selectedTimelineItem);
  if (!item) return null;
  return (
    <>
      {!omitName && (
        <>
          <EventName id={item.event} />{" "}
        </>
      )}
      <Card className="scroll" style={{overflowY: "auto", maxHeight: "75vh"}}>
        <CardBody>
          <FormGroup>
            <Label>Item Delay (in milliseconds)</Label>
            <Input
              type="number"
              defaultValue={item.delay || 0}
              onBlur={e => updateItem("delay", parseInt(e.target.value))}
            />
          </FormGroup>
          <FormGroup style={{marginLeft: "5ch"}}>
            <Label>
              <Input
                type="checkbox"
                defaultChecked={Boolean(item.noCancelOnReset)}
                onBlur={e => updateItem("noCancelOnReset", e.target.checked)}
              />
              Don't Cancel Delay on Flight Reset
            </Label>
          </FormGroup>
          <MacroWrapper
            id={item.id}
            delay={item.delay}
            steps={timeline}
            currentStep={selectedTimelineStep}
            event={item.event}
            args={item.args}
            updateMacro={updateMacro}
            stations={stations}
            clients={clients}
          />
        </CardBody>
      </Card>
    </>
  );
};

export const TimelineActionAdd: React.FC<{
  selectedTimelineItem?: string;
  selectedTimelineStep: string;
  mission: Mission;
  setSelectedTimelineItemAction?: (itemId: string | null) => void;
}> = ({
  selectedTimelineItem,
  selectedTimelineStep,
  mission,
  setSelectedTimelineItemAction,
}) => {
  const [addItemMutation] = useTimelineAddItemMutation();
  const [duplicateItemMutation] = useTimelineDuplicateItemMutation();

  const addTimelineItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedTimelineStep) return;
    const variables = {
      timelineStepId: selectedTimelineStep,
      missionId: mission.id,
      timelineItem: {
        name: e.target.value,
        type: "event",
        event: e.target.value,
      },
    };
    addItemMutation({variables}).then(
      res =>
        res.data?.addTimelineItemToTimelineStep &&
        setSelectedTimelineItemAction?.(res.data.addTimelineItemToTimelineStep),
    );
  };
  return (
    <>
      {selectedTimelineItem && (
        <Button
          size="sm"
          color="success"
          block
          onClick={async () => {
            const res = await duplicateItemMutation({
              variables: {
                missionId: mission.id,
                timelineStepId: selectedTimelineStep,
                timelineItemId: selectedTimelineItem,
              },
            });
            setSelectedTimelineItemAction?.(
              res.data?.timelineDuplicateItem || null,
            );
          }}
        >
          Duplicate Selected Action
        </Button>
      )}
      <EventPicker
        className={"btn btn-sm btn-success"}
        handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          addTimelineItem(e);
        }}
      />
    </>
  );
};

interface TimelineConfigProps {
  mission: Mission;
  removeMission: () => void;
  updateMission: (type: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  exportMissionScript: (mission: Mission) => void;
}
const TimelineConfig: React.FC<TimelineConfigProps> = ({
  mission,
  removeMission,
  updateMission,
  exportMissionScript,
}) => {
  const {
    missionId = "",
    timelineStep: selectedTimelineStep = "",
    timelineAction: selectedTimelineItem = "",
  } = useParams();
  const navigate = useNavigate();
  function setSelectedTimelineStepAction(stepId: string | null) {
    navigate(`/config/mission/${missionId}/${stepId || ""}`);
  }
  function setSelectedTimelineItemAction(itemId: string | null) {
    navigate(
      `/config/mission/${missionId}/${selectedTimelineStep}/${itemId || ""}`,
    );
  }

  const [updateStepMutation] = useTimelineUpdateStepMutation();
  const [reorderStepMutation] = useTimelineReorderStepMutation();
  const [reorderItemMutation] = useTimelineReorderItemMutation();
  const [removeItemMutation] = useTimelineRemoveItemMutation();

  const setSelectedTimelineStep = (stepId: string | null) => {
    setSelectedTimelineStepAction(stepId);
  };

  const updateStep = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTimelineStep || !selectedTimelineItem) return;
    const variables = {
      timelineStepId: selectedTimelineStep,
      missionId: mission.id,
      [type]: e.target.value,
    };
    updateStepMutation({variables});
  };

  const removeTimelineItem = (timelineItemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedTimelineStep) return;
    if (!mission.id) return;
    if (window.confirm("Are you sure you want to remove this timeline item?")) {
      if (timelineItemId === selectedTimelineItem) {
        setSelectedTimelineItemAction(null);
      }

      const variables = {
        timelineStepId: selectedTimelineStep,
        timelineItemId: timelineItemId,
        missionId: mission.id,
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
      setSelectedTimelineStep(mission.timeline[oldIndex].id);
    } else {
      const variables = {
        timelineStepId: mission.timeline[oldIndex].id,
        order: newIndex,
        missionId: mission.id,
      };

      reorderStepMutation({variables});
    }
  };

  const selectedStep = mission.timeline.find(
    e => e.id === selectedTimelineStep,
  );

  const onItemSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    if (oldIndex === newIndex) {
      setSelectedTimelineItemAction(
        selectedStep?.timelineItems[oldIndex]?.id || null,
      );
    } else {
      const variables = {
        timelineStepId: selectedStep?.id || "",
        timelineItemId: selectedStep?.timelineItems[oldIndex]?.id || "",
        order: newIndex,
        missionId: mission.id,
      };
      reorderItemMutation({variables});
    }
  };
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
            // @ts-expect-error
            items={mission.timeline}
            onSortEnd={onSortEnd}
            renderItem={(item: {id: string; name: string}) => (
              <li
                key={`${item.id}-timelineStep`}
                onClick={() => setSelectedTimelineStep(item.id)}
                className={`${
                  item.id === selectedTimelineStep ? "selected" : ""
                } list-group-item`}
              >
                {item.name}
              </li>
            )}
          />
        </Card>
        <TimelineStepButtons
          mission={mission}
          setSelectedTimelineStep={setSelectedTimelineStep}
          selectedTimelineStep={selectedTimelineStep}
          removeMission={removeMission}
          exportMissionScript={exportMissionScript}
        />
      </Col>
      {selectedTimelineStep === "mission" && (
        <Col sm={6}>
          <MissionConfig mission={mission} updateMission={updateMission} />
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
              <SortableList
                // @ts-expect-error
                items={selectedStep.timelineItems}
                renderItem={(e: any) =>
                  "needsConfig" in e ? (
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
                      <button
                        className=" pull-right clickable"
                        style={{border: "none", background: "none"}}
                        onClick={evt => {
                          evt.stopPropagation();
                          evt.preventDefault();
                          removeTimelineItem(e.id, evt);
                        }}
                      >
                        <FaBan
                          className="text-danger"
                          style={{pointerEvents: "none"}}
                        />
                      </button>
                    </li>
                  ) : null
                }
                onSortEnd={onItemSortEnd}
              />
            </Card>
            <TimelineActionAdd
              mission={mission}
              selectedTimelineItem={selectedTimelineItem}
              selectedTimelineStep={selectedTimelineStep}
              setSelectedTimelineItemAction={setSelectedTimelineItemAction}
            />
          </Col>
        )}
      {(() => {
        if (selectedTimelineItem === "step") {
          const step = mission.timeline.find(
            e => e.id === selectedTimelineStep,
          );
          if (!step) return null;
          return (
            <Col sm="6" key={step.id}>
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
                  defaultValue={step.description || ""}
                  placeholder="Here is where you would explain what is going on during this part of the mission. This serves as your script, explaining what actions should be taken and where the story goes next."
                  onChange={e => updateStep("description", e)}
                />
              </FormGroup>
            </Col>
          );
        } else if (selectedTimelineItem) {
          return (
            <Col sm="6" key={`${selectedTimelineItem}-${selectedTimelineStep}`}>
              <TimelineMacroConfig
                missionId={mission.id}
                timeline={mission.timeline}
                selectedTimelineItem={selectedTimelineItem}
                selectedTimelineStep={selectedTimelineStep}
              />
            </Col>
          );
        }
      })()}
    </Row>
  );
};

export default TimelineConfig;
