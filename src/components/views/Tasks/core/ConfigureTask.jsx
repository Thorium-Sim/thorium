import React, {Fragment} from "react";
import {Query} from "react-apollo";
import {Badge, Input, Button} from "helpers/reactstrap";
import uuid from "uuid";
import EventName from "containers/FlightDirector/MissionConfig/EventName";
import EventPicker from "containers/FlightDirector/MissionConfig/EventPicker";
import gql from "graphql-tag.macro";
import ValueInput from "./ValueInput";
import {FaBan} from "react-icons/fa";
import SearchableList from "helpers/SearchableList";

const ConfigureTask = ({
  definitionGroups,
  selectedDefinition,
  taskTemplates,
  definition,
  station,
  requiredValues,
  simulator,
  macros,
  preMacros,
  updateSelectedDefinition,
  updateRequiredValues,
  updateStation,
  updateMacros,
  updatePreMacros,
  configureMacro,
}) => {
  return (
    <div style={{display: "flex", flex: 1, height: "calc(100% - 20px)"}}>
      <div
        style={{
          flex: 3,
          height: "100%",
          overflowY: "auto",
        }}
      >
        Definitions
        <SearchableList
          items={Object.entries(definitionGroups).reduce(
            (prev, [key, next]) =>
              prev.concat(
                next.map(({name}) => ({id: name, label: name, category: key})),
              ),
            [],
          )}
          selectedItem={selectedDefinition}
          setSelectedItem={id => updateSelectedDefinition(id)}
          renderItem={item => (
            <React.Fragment>
              {item.label}{" "}
              <Badge title="Templates Available">
                {taskTemplates.filter(t => t.definition === item.id).length}
              </Badge>
              {taskTemplates.filter(t => t.definition === item.id && t.assigned)
                .length > 0 && (
                <Badge color="warning" title="Templates Assigned">
                  {
                    taskTemplates.filter(
                      t => t.definition === item.id && t.assigned,
                    ).length
                  }
                </Badge>
              )}
            </React.Fragment>
          )}
        />
      </div>
      <div style={{flex: 7, overflowY: "auto"}}>
        {definition && (
          <Fragment>
            {!definition.active && (
              <div>
                <strong>
                  This task might be redundant or unnecessary. Double check it
                  before assigning it.
                </strong>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflowX: "hidden",
                padding: "0 10px",
              }}
            >
              <div>
                <label>Templates (optional)</label>
                <Input
                  type="select"
                  value="none"
                  onChange={e => {
                    const template = taskTemplates.find(
                      t => t.id === e.target.value,
                    );
                    updateRequiredValues(template.values);
                    template.macros &&
                      template.macros.length &&
                      updateMacros(template.macros);
                    template.preMacros &&
                      template.preMacros.length &&
                      updatePreMacros(template.preMacros);
                  }}
                >
                  <option value="none">Choose a Template</option>
                  {taskTemplates
                    .filter(t => t.definition === selectedDefinition)
                    .map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                </Input>
              </div>
              <div>
                <label>
                  Station
                  <Input
                    type="select"
                    value={station}
                    onChange={e => updateStation(e.target.value)}
                  >
                    <option value="nothing" disabled>
                      Select a station
                    </option>{" "}
                    <optgroup label="Task Stations">
                      {definition.stations?.map(s => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Other Stations">
                      {simulator.stations
                        .filter(
                          s =>
                            !definition.stations?.find(d => d.name === s.name),
                        )
                        .map(s => (
                          <option key={`other-${s.name}`} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                    </optgroup>
                  </Input>
                </label>
                {Object.keys(definition.valuesInput).map(v => (
                  <ValueInput
                    key={v}
                    label={v}
                    type={definition.valuesInput[v]}
                    value={requiredValues[v]}
                    placeholder={definition.valuesValue[v]}
                    simulatorId={simulator.id}
                    onBlur={value =>
                      updateRequiredValues({
                        ...requiredValues,
                        [v]: value,
                      })
                    }
                  />
                ))}
              </div>
              <div>
                <p>Task Instructions:</p>

                <Query
                  query={gql`
                    query Instructions(
                      $simulatorId: ID
                      $definition: String!
                      $values: JSON!
                      $task: TaskInput
                    ) {
                      taskInstructions(
                        simulatorId: $simulatorId
                        definition: $definition
                        requiredValues: $values
                        task: $task
                      )
                    }
                  `}
                  variables={{
                    simulatorId: simulator.id,
                    definition: definition.id,
                    values: {
                      ...definition.valuesValue,
                      ...requiredValues,
                    },
                    task: {station},
                  }}
                >
                  {({loading, data, error}) =>
                    loading || !data ? (
                      <p>Loading instructions...</p>
                    ) : error ? (
                      <p>
                        Error:
                        {error.message}
                      </p>
                    ) : (
                      <p style={{whiteSpace: "pre-wrap"}}>
                        {data.taskInstructions}
                      </p>
                    )
                  }
                </Query>
              </div>
              <hr />
              <MacroPicker
                updateMacros={updateMacros}
                macros={macros}
                configureMacro={configureMacro}
              />
              <MacroPicker
                pre
                updateMacros={updatePreMacros}
                macros={preMacros}
                configureMacro={configureMacro}
              />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ConfigureTask;

const MacroPicker = ({pre, updateMacros, macros, configureMacro}) => {
  return (
    <div>
      <label>
        {pre ? "Pre" : ""}Macros{" "}
        <small>
          Will be triggered when task is {pre ? "created" : "complete"}
        </small>
      </label>
      <EventPicker
        className={"btn btn-sm btn-success"}
        handleChange={e => {
          const {value: event} = e.target;
          updateMacros(
            macros
              .map(({__typename, ...rest}) => rest)
              .concat({
                event,
                args: "{}",
                delay: 0,
                id: uuid.v4(),
              }),
          );
        }}
      />
      {macros.map(m => (
        <div
          key={m.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>
            <EventName id={m.event} label={m.event} />
          </span>{" "}
          <Button
            size="sm"
            color="warning"
            onClick={() => configureMacro(m.id)}
          >
            Configure Macro
          </Button>{" "}
          <FaBan
            className="text-danger"
            onClick={() => updateMacros(macros.filter(mm => mm.id !== m.id))}
          />
        </div>
      ))}
    </div>
  );
};
