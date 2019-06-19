import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { Button, ButtonGroup } from "reactstrap";
import debounce from "helpers/debounce";

const Buttons = ({
  id,
  attacking,
  simulator,
  fighterStrength,
  enemyStrength
}) => {
  const debounceUpdate = debounce((action, variables) => {
    action({ variables });
  }, 1000);
  return (
    <>
      <ButtonGroup>
        <Mutation
          mutation={gql`
            mutation SetClientHypercard($simulatorId: ID, $component: String) {
              setClientHypercard(
                component: $component
                simulatorId: $simulatorId
              )
            }
          `}
          variables={{
            component: "CrmFighter",
            simulatorId: simulator.id
          }}
        >
          {action => (
            <Button color="success" size="sm" onClick={action}>
              Activate All Stations
            </Button>
          )}
        </Mutation>
        <Mutation
          mutation={gql`
            mutation SetClientHypercard($simulatorId: ID, $component: String) {
              setClientHypercard(
                component: $component
                simulatorId: $simulatorId
              )
            }
          `}
          variables={{
            component: null,
            simulatorId: simulator.id
          }}
        >
          {action => (
            <Button color="warning" size="sm" onClick={action}>
              Deactivate All Stations
            </Button>
          )}
        </Mutation>
      </ButtonGroup>
      <ButtonGroup>
        <Mutation
          mutation={gql`
            mutation DestroyUndocked($id: ID!) {
              crmDestroyUndockedFighters(id: $id)
            }
          `}
          variables={{
            id
          }}
        >
          {action => (
            <Button color="danger" size="sm" onClick={action}>
              Destroy All Undocked Fighters
            </Button>
          )}
        </Mutation>
        <Mutation
          mutation={gql`
            mutation Restore($id: ID!) {
              crmRestoreFighters(id: $id)
            }
          `}
          variables={{
            id
          }}
        >
          {action => (
            <Button color="info" size="sm" onClick={action}>
              Restore All Fighters
            </Button>
          )}
        </Mutation>
      </ButtonGroup>
      <div>
        <label>
          <Mutation
            mutation={gql`
              mutation Attack($id: ID!, $attacking: Boolean!) {
                crmSetAttacking(id: $id, attacking: $attacking)
              }
            `}
          >
            {action => (
              <input
                type="checkbox"
                checked={attacking}
                onClick={e =>
                  action({ variables: { id, attacking: e.target.checked } })
                }
              />
            )}
          </Mutation>{" "}
          Enemies are attacking
        </label>
        <div className="strength-ranges">
          <label>
            Fighter Strength{" "}
            <Mutation
              mutation={gql`
                mutation Strength($id: ID!, $strength: Float!) {
                  crmSetFighterStrength(id: $id, strength: $strength)
                }
              `}
            >
              {action => (
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  defaultValue={fighterStrength}
                  step="0.1"
                  onChange={e =>
                    debounceUpdate(action, {
                      id,
                      strength: parseFloat(e.target.value)
                    })
                  }
                />
              )}
            </Mutation>
          </label>
          <label>
            Enemy Strength{" "}
            <Mutation
              mutation={gql`
                mutation Strength($id: ID!, $strength: Float!) {
                  crmSetEnemyStrength(id: $id, strength: $strength)
                }
              `}
            >
              {action => (
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  defaultValue={enemyStrength}
                  step="0.1"
                  onChange={e =>
                    debounceUpdate(action, {
                      id,
                      strength: parseFloat(e.target.value)
                    })
                  }
                />
              )}
            </Mutation>
          </label>
        </div>
      </div>
    </>
  );
};
export default Buttons;
