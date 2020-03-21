import React from "react";
import {MacroConfigProps} from "helpers/genericTypes";
import {FormGroup, Label, Input} from "helpers/reactstrap";
import {useDockingShuttleConfigQuery, DockingPort} from "generated/graphql";
import {capitalCase} from "change-case";
import styled from "styled-components";

const FormWrapper = styled.div`
  label {
    display: block;
    margin-left: 2rem;
  }
`;
const UpdateDockingPort: React.FC<MacroConfigProps> = ({
  simulatorId,
  updateArgs,
  args,
}) => {
  const port = args.port || {};
  const {data, loading} = useDockingShuttleConfigQuery({
    variables: {simulatorId: simulatorId || ""},
    skip: !simulatorId,
  });
  if (loading) return null;
  const sortedDockingPorts =
    data?.docking?.reduce((prev: {[key: string]: DockingPort[]}, next) => {
      if (!next || !next.type) return prev;
      prev[next.type] = prev[next.type] || [];
      prev[next.type].push(next);
      return prev;
    }, {}) || {};

  if (Object.keys(sortedDockingPorts).length === 0) {
    return (
      <p>
        Since different simulators might have different docking configurations,
        this macro must be configured in the Simulator Config of each simulator
        that runs this mission.
      </p>
    );
  }
  const simPort = data?.docking?.find(d => d?.id === port.id) || {};
  return (
    <FormWrapper key={port.id || Math.random()}>
      <FormGroup>
        <Label>
          Shuttle/Docking Port
          <Input
            type="select"
            defaultValue={port.id || simPort.id || "nothing"}
            onChange={evt =>
              updateArgs("port", {...port, id: evt.target.value})
            }
          >
            <option value="nothing" disabled>
              Choose a Shuttle or Docking Port
            </option>
            {Object.entries(sortedDockingPorts).map(([key, value]) => (
              <optgroup key={key} label={capitalCase(key)}>
                {value.map(d => (
                  <option key={d.id || undefined} value={d.id || undefined}>
                    {d.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </Input>
        </Label>
        {simPort && (
          <React.Fragment key={simPort.id || ""}>
            {(simPort.type === "specialized" ||
              simPort.type === "dockingport") && (
              <Label>
                Ship Name
                <Input
                  type="text"
                  defaultValue={port.shipName || simPort.shipName}
                  onChange={evt =>
                    updateArgs("port", {...port, shipName: evt.target.value})
                  }
                />
              </Label>
            )}
            {simPort.type === "shuttlebay" && (
              <Label>
                Image
                <Input
                  type="select"
                  defaultValue={port.image || simPort.image}
                  onChange={evt =>
                    updateArgs("port", {...port, image: evt.target.value})
                  }
                >
                  {data?.assetFolders?.[0]?.objects.map(a => (
                    <option key={a.id} value={a.fullPath}>
                      {a.name}
                    </option>
                  ))}
                </Input>
              </Label>
            )}
            <Label>
              <Input
                type="checkbox"
                defaultChecked={port.docked || simPort.docked}
                onChange={evt =>
                  updateArgs("port", {...port, docked: evt.target.checked})
                }
              />{" "}
              Present
            </Label>
            <Label>
              <Input
                type="checkbox"
                defaultChecked={port.clamps || simPort.clamps}
                onChange={evt =>
                  updateArgs("port", {...port, clamps: evt.target.checked})
                }
              />{" "}
              Clamps
            </Label>
            {simPort.type !== "dockingport" && (
              <Label>
                <Input
                  type="checkbox"
                  defaultChecked={port.compress || simPort.compress}
                  onChange={evt =>
                    updateArgs("port", {...port, compress: evt.target.checked})
                  }
                />{" "}
                {simPort.type === "shuttlebay" ? "Compress" : "Ramps"}
              </Label>
            )}
            <Label>
              <Input
                type="checkbox"
                defaultChecked={port.doors || simPort.doors}
                onChange={evt =>
                  updateArgs("port", {...port, doors: evt.target.checked})
                }
              />{" "}
              {simPort.type === "dockingport" ? "Ramps" : "Doors"}
            </Label>
            {simPort.type === "shuttlebay" && (
              <Label>
                Direction
                <Input
                  type="select"
                  defaultValue={port.direction || simPort.direction}
                  onChange={evt =>
                    updateArgs("port", {...port, direction: evt.target.value})
                  }
                >
                  <option value="unspecified">Unspecified</option>
                  <option value="arriving">Arriving</option>
                  <option value="departing">Departing</option>
                </Input>
              </Label>
            )}
          </React.Fragment>
        )}
      </FormGroup>
    </FormWrapper>
  );
};

export const updateDockingPort = UpdateDockingPort;
