import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { Button, Card, Input } from "reactstrap";
import FontAwesome from "react-fontawesome";
import EventName from "containers/FlightDirector/MissionConfig/EventName";
import EventPicker from "containers/FlightDirector/MissionConfig/EventPicker";
import uuid from "uuid";
import MacroConfig from "./macroConfig";

class MacrosCore extends Component {
  state = { actions: [] };
  render() {
    const { simulator, clients } = this.props;
    const { actions = [], selectedAction } = this.state;
    const action = actions.find(a => a.id === selectedAction);
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ flex: 1 }}>
            <Card className="scroll">
              {actions.map(e => (
                <li
                  key={e.id}
                  onClick={() => this.setState({ selectedAction: e.id })}
                  className={`${
                    e.id === selectedAction ? "active" : ""
                  } list-group-item`}
                >
                  <EventName id={e.event} label={e.event} />{" "}
                  <FontAwesome
                    name="ban"
                    className="text-danger pull-right"
                    onClick={() =>
                      this.setState(state => ({
                        actions: state.actions.filter(a => a.id !== e.id)
                      }))
                    }
                  />
                </li>
              ))}

              <EventPicker
                className={"btn btn-sm btn-success"}
                handleChange={e => {
                  const { value: event } = e.target;
                  this.setState(state => {
                    const id = uuid.v4();
                    return {
                      actions: state.actions
                        .map(({ __typename, ...rest }) => rest)
                        .concat({
                          event,
                          args: "{}",
                          delay: 0,
                          id
                        }),
                      selectedAction: id
                    };
                  });
                }}
              />
            </Card>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {action && (
              <div>
                <label style={{ display: "block" }}>
                  Delay (in ms)
                  <Input
                    key={action.id}
                    type="number"
                    style={{ height: "20px" }}
                    defaultValue={action.delay}
                    onBlur={e => {
                      const delay = parseInt(e.target.value, 10) || 0;
                      this.setState(state => ({
                        actions: state.actions.map(a =>
                          a.id === action.id ? { ...a, delay } : a
                        )
                      }));
                    }}
                  />
                </label>
                <MacroConfig
                  key={action.id}
                  action={action}
                  stations={simulator.stations}
                  clients={clients}
                  updateAction={actionUpdate =>
                    this.setState(state => ({
                      actions: state.actions.map(a =>
                        a.id === action.id ? actionUpdate : a
                      )
                    }))
                  }
                />
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <Button
            style={{ flex: 1 }}
            color="danger"
            size="sm"
            onClick={() => this.setState({ actions: [] })}
          >
            Clear
          </Button>
          <Mutation
            mutation={gql`
              mutation ExecuteMacro($simulatorId: ID!, $macros: [MacroInput]!) {
                triggerMacros(simulatorId: $simulatorId, macros: $macros)
              }
            `}
            variables={{
              simulatorId: simulator.id,
              macros: actions.map(({ id, ...rest }) => rest)
            }}
          >
            {triggerMacros => (
              <Button
                style={{ flex: 1 }}
                color="success"
                size="sm"
                onClick={() => {
                  triggerMacros();
                  this.setState({ actions: [] });
                }}
              >
                Trigger Macros
              </Button>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default MacrosCore;
