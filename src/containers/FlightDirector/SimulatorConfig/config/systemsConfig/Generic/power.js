import React from "react";
import {FormGroup, Input, Label, Button} from "helpers/reactstrap";
import {Mutation} from "react-apollo";
import {GENERIC_QUERY} from "./index";
import gql from "graphql-tag.macro";
import {FaPlusCircle, FaMinusCircle} from "react-icons/fa";
import {useSystemSetWingMutation} from "generated/graphql";

const Power = ({id, simulatorId, wing, power, powerRender}) => {
  const [setWing] = useSystemSetWingMutation();
  return (
    <FormGroup>
      <Label>
        Required Power{" "}
        <small>Click the green button to make a power level the default.</small>
      </Label>
      <Mutation
        mutation={gql`
          mutation UpdatePowerLevels($id: ID!, $levels: [Int]!) {
            changeSystemPowerLevels(systemId: $id, powerLevels: $levels)
          }
        `}
        refetchQueries={[{query: GENERIC_QUERY, variables: {id, simulatorId}}]}
      >
        {action => (
          <div>
            <FaPlusCircle
              onClick={() => {
                const lastLevel =
                  power?.powerLevels[power?.powerLevels?.length - 1] || 4;
                const levels = power.powerLevels.concat(lastLevel + 1);
                action({variables: {id, levels}});
              }}
              className="text-success"
            />

            <FaMinusCircle
              onClick={() => {
                const levels = power?.powerLevels.concat();
                levels.pop();
                action({variables: {id, levels}});
              }}
              className="text-danger"
            />

            {power?.powerLevels &&
              power?.powerLevels?.map((p, i) => (
                <div
                  key={`system-power-${i}`}
                  style={{display: "inline-flex", flexDirection: "column"}}
                >
                  <Input
                    style={{
                      width: "40px",
                      padding: "2px",
                      display: "inline-block",
                    }}
                    type="number"
                    name="power"
                    defaultValue={p || ""}
                    onChange={e => {
                      const levels = power?.powerLevels?.concat() || [];
                      levels[i] = parseInt(e.target.value, 10);
                      action({variables: {id, levels}});
                    }}
                  />
                  {power.defaultLevel !== i && (
                    <Mutation
                      mutation={gql`
                        mutation ChangeDefaultLevel($id: ID!, $level: Int!) {
                          changeSystemDefaultPowerLevel(id: $id, level: $level)
                        }
                      `}
                      variables={{id, level: i}}
                      refetchQueries={[
                        {query: GENERIC_QUERY, variables: {id, simulatorId}},
                      ]}
                    >
                      {action => (
                        <Button color="success" onClick={action}>
                          {" "}
                        </Button>
                      )}
                    </Mutation>
                  )}
                </div>
              ))}
            <Mutation
              mutation={gql`
                mutation ChangeDefaultLevel($id: ID!, $level: Int!) {
                  changeSystemDefaultPowerLevel(id: $id, level: $level)
                }
              `}
              variables={{id, level: -1}}
              refetchQueries={[
                {query: GENERIC_QUERY, variables: {id, simulatorId}},
              ]}
            >
              {action => (
                <Button color="warning" onClick={action}>
                  0 Power Default
                </Button>
              )}
            </Mutation>
            {powerRender && powerRender()}
          </div>
        )}
      </Mutation>
      <div style={{marginLeft: "30px"}}>
        <Label>
          Ship Wing (Only applies if reactor is using wing distribution)
          <Input
            type="select"
            defaultValue={wing}
            onChange={e =>
              setWing({variables: {systemId: id, wing: e.target.value}})
            }
          >
            <option value={"left"}>Left Wing</option>
            <option value={"right"}>Right Wing</option>
          </Input>
        </Label>
      </div>
    </FormGroup>
  );
};
export default Power;
