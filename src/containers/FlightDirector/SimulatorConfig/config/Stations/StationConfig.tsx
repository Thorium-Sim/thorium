import React from "react";
import {Container, Row, Col} from "helpers/reactstrap";
import {Widgets} from "components/views/index";
import ExtraMessageGroups from "./messageGroups";
import {capitalCase} from "change-case";
import TrainingConfig from "./trainingConfig";
import AmbianceConfig from "./ambianceConfig";
import LayoutList from "components/layouts";
import SortableList from "helpers/SortableList";
import {
  Simulator,
  Station,
  useToggleStationMessageGroupMutation,
  useToggleStationWidgetMutation,
  useSetStationLayoutMutation,
  useReorderStationWidgetsMutation,
} from "generated/graphql";
import {useParams} from "react-router";
import CardsTable from "./CardsTable";

const Layouts = Object.keys(LayoutList).filter(
  s => s.indexOf("Viewscreen") === -1,
);

interface ConfigStationProps {
  simulator: Simulator;
  station: Station;
}
function isString(a: unknown): a is string {
  return typeof a === "string";
}
const ConfigStation: React.FC<ConfigStationProps> = ({simulator, station}) => {
  const {subPath1: selectedStationSet} = useParams();

  const [toggleMessageGroup] = useToggleStationMessageGroupMutation();
  const [toggleStationWidgetMutation] = useToggleStationWidgetMutation();
  const [setStationLayoutMutation] = useSetStationLayoutMutation();
  const [reorderWidgets] = useReorderStationWidgetsMutation();

  const toggleStationMessageGroup = (
    evt: React.ChangeEvent<HTMLInputElement>,
    group: string,
  ) => {
    if (!selectedStationSet || !station.name) return;
    toggleMessageGroup({
      variables: {
        stationSetId: selectedStationSet,
        station: station.name,
        group,
        state: evt.target.checked,
      },
    });
  };
  const toggleStationWidget = (
    evt: React.ChangeEvent<HTMLInputElement>,
    widget: string,
  ) => {
    if (!selectedStationSet || !station.name) return;
    toggleStationWidgetMutation({
      variables: {
        stationSetID: selectedStationSet,
        stationName: station.name,
        widget,
        state: evt.target.checked,
      },
    });
  };
  const setStationLayout = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedStationSet || !station.name) return;
    setStationLayoutMutation({
      variables: {
        id: selectedStationSet,
        name: station.name,
        layout: evt.target.value,
      },
    });
  };
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const widget = station?.widgets?.[oldIndex];
    if (!selectedStationSet || !station.name || !widget) return;
    reorderWidgets({
      variables: {
        id: selectedStationSet,
        name: station.name,
        widget,
        order: newIndex,
      },
    });
  };
  if (!station) return <p>Error - Station not found.</p>;
  return (
    <Container fluid>
      <h5>Stations</h5>
      <div className="scroll">
        <div
          style={{
            marginBottom: "15px",
            border: "solid 1px rgba(0,0,0,0.5)",
          }}
        >
          <CardsTable simulator={simulator} station={station} />
          <label>Message Groups:</label>
          <Row>
            {["SecurityTeams", "DamageTeams", "MedicalTeams"].map(group => (
              <Col sm={4} key={`messageGroup-list-${group}`}>
                <label style={{display: "inline-block"}}>
                  <input
                    type="checkbox"
                    checked={station?.messageGroups?.includes(group)}
                    onChange={evt => toggleStationMessageGroup(evt, group)}
                  />{" "}
                  {capitalCase(group)}
                </label>
              </Col>
            ))}
          </Row>
          <ExtraMessageGroups
            station={station.name || ""}
            messageGroups={station.messageGroups || []}
          />
          <label>Widgets:</label>
          <Row>
            <Col sm={6}>
              {Object.keys(Widgets).map(widget => (
                <label key={`widgets-${widget}`} style={{display: "block"}}>
                  <input
                    type="checkbox"
                    checked={station?.widgets?.includes(widget)}
                    onChange={evt => toggleStationWidget(evt, widget)}
                  />{" "}
                  {capitalCase(widget)}
                </label>
              ))}
            </Col>
            <Col sm={6}>
              Widget Order
              <SortableList
                distance={10}
                items={
                  station?.widgets
                    ?.filter(isString)
                    .map(w => ({id: w, name: w})) || []
                }
                onSortEnd={onSortEnd}
                selectedItem={null}
                setSelectedItem={() => {}}
              />
            </Col>
          </Row>
          <TrainingConfig station={station} />
          <AmbianceConfig station={station} />
          <div>
            <label>Layout:</label>
            <select
              onChange={setStationLayout}
              value={station.layout || ""}
              name="layout"
              className="c-select form-control"
            >
              <option value="">Simulator Layout</option>
              {Layouts.map(e => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ConfigStation;
