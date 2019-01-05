import React from "react";
import { Input, Container, Row, Col, Label } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ops from "./ops";
import FontAwesome from "react-fontawesome";
import Views, { Widgets } from "components/views/index";
import ExtraMessageGroups from "./messageGroups";
import { titleCase } from "change-case";
import TrainingConfig from "./trainingConfig";
import AmbianceConfig from "./ambianceConfig";
import LayoutList from "components/layouts";
import SortableList from "helpers/sortableList";

const Layouts = Object.keys(LayoutList).filter(
  s => s.indexOf("Viewscreen") === -1
);

const viewList = Object.keys(Views)
  .filter(v => {
    return v !== "Offline" && v !== "Login" && v !== "Viewscreen";
  })
  .sort();

const ConfigStation = props => {
  const {
    client,
    selectedStationSet,
    simulator,
    station,
    data: { loading, softwarePanels }
  } = props;
  const inSim = comp => {
    const stationSet = simulator.stationSets.find(
      s => s.id === selectedStationSet
    );
    const cards = stationSet.stations.reduce(
      (prev, next) => prev.concat(next.cards.map(c => c.component)),
      []
    );
    return cards.indexOf(comp) > -1;
  };
  const updateStationCard = (type, card, e) => {
    const variables = {
      stationSetId: selectedStationSet,
      stationName: station.name,
      cardName: card.name
    };
    variables[type] = e.target.value;
    client.mutate({
      mutation: ops.updateStationCard,
      variables
    });
  };
  const removeCard = card => {
    if (window.confirm("Are you sure you want to delete that card?")) {
      const variables = {
        id: selectedStationSet,
        stationName: station.name,
        cardName: card.name
      };
      client.mutate({
        mutation: ops.removeCard,
        variables
      });
    }
  };
  const addCard = e => {
    let name = prompt("What is the card name?", titleCase(e.target.value));
    if (name) {
      const variables = {
        id: selectedStationSet,
        name: station.name,
        cardName: name,
        cardComponent: e.target.value
      };
      client.mutate({
        mutation: ops.addCard,
        variables
      });
    }
  };
  const toggleStationMessageGroup = (evt, group) => {
    const variables = {
      stationSetId: selectedStationSet,
      station: station.name,
      group,
      state: evt.target.checked
    };
    client.mutate({
      mutation: ops.toggleStationMessageGroup,
      variables
    });
  };
  const toggleStationWidget = (evt, widget) => {
    const variables = {
      stationSetID: selectedStationSet,
      stationName: station.name,
      widget,
      state: evt.target.checked
    };
    client.mutate({
      mutation: ops.toggleStationWidget,
      variables
    });
  };
  const setStationLogin = evt => {
    const variables = {
      stationSetID: selectedStationSet,
      stationName: station.name,
      login: evt.target.checked
    };
    client.mutate({
      mutation: ops.toggleStationLogin,
      variables
    });
  };
  const setStationExecutive = evt => {
    const variables = {
      stationSetID: selectedStationSet,
      stationName: station.name,
      exec: evt.target.checked
    };
    client.mutate({
      mutation: ops.toggleStationExec,
      variables
    });
  };
  const setStationLayout = evt => {
    const variables = {
      id: selectedStationSet,
      name: station.name,
      layout: evt.target.value
    };
    client.mutate({
      mutation: ops.setStationLayout,
      variables
    });
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const variables = {
      id: selectedStationSet,
      name: station.name,
      widget: station.widgets[oldIndex],
      order: newIndex
    };
    const mutation = gql`
      mutation ReorderStationWidgets(
        $id: ID!
        $name: String!
        $widget: String!
        $order: Int!
      ) {
        reorderStationWidgets(
          stationSetId: $id
          stationName: $name
          widget: $widget
          order: $order
        )
      }
    `;

    client.mutate({
      mutation,
      variables
    });
  };
  if (!station) return "Error - Station not found.";
  return (
    <Container fluid>
      <h5>Stations</h5>
      <div className="scroll">
        <div
          style={{
            marginBottom: "15px",
            border: "solid 1px rgba(0,0,0,0.5)"
          }}
        >
          <table className="table table-sm table-striped table-hover">
            <thead className="thead-default">
              <tr>
                <th colSpan="3">
                  <span>
                    {station.name} |{" "}
                    <label style={{ display: "inline" }}>
                      <input
                        checked={station.login}
                        onChange={setStationLogin}
                        type="checkbox"
                      />{" "}
                      Auto-Login
                    </label>{" "}
                    |{" "}
                    <label style={{ display: "inline" }}>
                      <input
                        checked={station.executive}
                        onChange={setStationExecutive}
                        type="checkbox"
                      />{" "}
                      Executive
                    </label>
                  </span>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan="3">
                  <Label>
                    Description
                    <Mutation
                      mutation={gql`
                        mutation SetDescription(
                          $stationSetID: ID!
                          $stationName: String!
                          $description: String!
                        ) {
                          setStationDescription(
                            stationSetID: $stationSetID
                            stationName: $stationName
                            description: $description
                          )
                        }
                      `}
                    >
                      {action => (
                        <Input
                          key={station.name}
                          type="textarea"
                          defaultValue={station.description}
                          onBlur={e =>
                            action({
                              variables: {
                                stationSetID: selectedStationSet,
                                stationName: station.name,
                                description: e.target.value
                              }
                            })
                          }
                        />
                      )}
                    </Mutation>
                  </Label>
                </th>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th>Name</th>
                <th>Component</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {station.cards.map((card, index) => {
                return (
                  <tr
                    key={`${selectedStationSet.id}-${station.name}-${
                      card.name
                    }`}
                  >
                    <td>
                      <Input
                        type="text"
                        defaultValue={card.name}
                        onBlur={e => updateStationCard("name", card, e)}
                      />
                    </td>
                    <td>
                      <Input
                        type="select"
                        value={card.component}
                        onChange={e => updateStationCard("component", card, e)}
                      >
                        {viewList.map(e => {
                          return (
                            <option key={e} value={e}>
                              {e}
                            </option>
                          );
                        })}
                        <option disabled>-----------</option>
                        {!loading &&
                          simulator.panels.map(p => (
                            <option key={p} value={p}>
                              {softwarePanels.find(s => s.id === p) &&
                                softwarePanels.find(s => s.id === p).name}
                            </option>
                          ))}
                      </Input>
                    </td>
                    <td>
                      <FontAwesome
                        name="ban"
                        className="text-danger"
                        onClick={() => removeCard(card)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <label>Select a component to add a card</label>
          <select
            className="c-select form-control"
            value="nothing"
            onChange={e => addCard(e)}
          >
            <option value="nothing">Please Select A Card</option>
            {viewList.map(e => (
              <option key={`card-select-${e}`} value={e}>
                {`${inSim(e) ? "✅ " : ""}${e}`}
              </option>
            ))}
            <option disabled>-----------</option>
            {!loading &&
              simulator.panels.map(p => (
                <option key={p} value={p}>
                  {softwarePanels.find(s => s.id === p) &&
                    softwarePanels.find(s => s.id === p).name}
                </option>
              ))}
          </select>
          <label>Message Groups:</label>
          <Row>
            {["SecurityTeams", "DamageTeams", "MedicalTeams"].map(group => (
              <Col sm={4} key={`messageGroup-list-${group}`}>
                <label style={{ display: "inline-block" }}>
                  <input
                    type="checkbox"
                    checked={station.messageGroups.indexOf(group) > -1}
                    onChange={evt => toggleStationMessageGroup(evt, group)}
                  />{" "}
                  {titleCase(group)}
                </label>
              </Col>
            ))}
          </Row>
          <ExtraMessageGroups
            stationSetId={selectedStationSet}
            station={station.name}
            messageGroups={station.messageGroups}
          />
          <label>Widgets:</label>
          <Row>
            <Col sm={6}>
              {Object.keys(Widgets).map(widget => (
                <label key={`widgets-${widget}`} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    checked={station.widgets.indexOf(widget) > -1}
                    onChange={evt => toggleStationWidget(evt, widget)}
                  />{" "}
                  {titleCase(widget)}
                </label>
              ))}
            </Col>
            <Col sm={6}>
              Widget Order
              <SortableList
                items={station.widgets.map(w => ({ id: w, name: w }))}
                onSortEnd={onSortEnd}
                selected={false}
                select={() => {}}
              />
            </Col>
          </Row>
          <TrainingConfig
            selectedStationSet={selectedStationSet}
            station={station}
          />
          <AmbianceConfig
            selectedStationSet={selectedStationSet}
            station={station}
          />
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
