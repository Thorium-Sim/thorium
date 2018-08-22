import React from "react";
import { Input } from "reactstrap";
import ops from "./ops";
import FontAwesome from "react-fontawesome";
import Views, { Widgets } from "../../../../../components/views/index";
import { titleCase } from "change-case";
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
  return (
    <div>
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
                  <tr key={`${selectedStationSet.id}-${station.name}-${index}`}>
                    <td>
                      <Input
                        type="text"
                        value={card.name}
                        onChange={e => updateStationCard("name", card, e)}
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
            {viewList.map(e => {
              return (
                <option key={e} value={e}>
                  {inSim(e) && "✅ "}
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
          </select>
          <label>Message Groups:</label>
          {["SecurityTeams", "DamageTeams", "MedicalTeams"].map(group => (
            <label
              key={`messageGroup-${group}`}
              style={{ display: "inline-block" }}
            >
              <input
                type="checkbox"
                checked={station.messageGroups.indexOf(group) > -1}
                onChange={evt => toggleStationMessageGroup(evt, group)}
              />{" "}
              {group}
            </label>
          ))}
          <label>Widgets:</label>
          {Object.keys(Widgets).map(widget => (
            <label
              key={`widgets-${widget}`}
              style={{ display: "inline-block" }}
            >
              <input
                type="checkbox"
                checked={station.widgets.indexOf(widget) > -1}
                onChange={evt => toggleStationWidget(evt, widget)}
              />{" "}
              {widget}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigStation;
