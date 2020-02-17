import React, {Fragment} from "react";
import {
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
  ListGroup,
  ListGroupItem,
} from "helpers/reactstrap";
import {Mutation} from "react-apollo";
import gql from "graphql-tag.macro";
import {GENERIC_QUERY} from "./index";
import {ConfigureMacro} from "../../../../TaskTemplates/taskConfig";
import lumenData from "helpers/laserGame/data.json";
import robozzleData from "helpers/robozzleGame/data.json";
import LaserGame from "helpers/laserGame";
import RobozzleGame from "helpers/robozzleGame";

const UPGRADE_BOARD = gql`
  mutation UpgradeBoard($systemId: ID!, $upgradeBoard: ID) {
    updateSystemUpgradeBoard(systemId: $systemId, upgradeBoard: $upgradeBoard)
  }
`;
const ExocompControl = ({simulatorId, upgradeBoard, systemId}) => {
  const [game, setGame] = React.useState(() =>
    upgradeBoard
      ? upgradeBoard.includes("lumen")
        ? "lumen"
        : "robozzle"
      : null,
  );
  return (
    <Mutation
      mutation={UPGRADE_BOARD}
      refetchQueries={[
        {query: GENERIC_QUERY, variables: {id: systemId, simulatorId}},
        {query: SYSTEM_QUERY, variables: {simulatorId}},
      ]}
    >
      {action => (
        <div>
          Exocomp Upgrade Board{" "}
          <small>Must be chosen to enable Exocomp system upgrades</small>
          <div>
            <ButtonGroup>
              <Button
                color="warning"
                size="sm"
                active={game === "lumen"}
                onClick={() => setGame("lumen")}
              >
                Lumen
              </Button>
              <Button
                color="info"
                size="sm"
                active={game === "robozzle"}
                onClick={() => setGame("robozzle")}
              >
                Robozzle
              </Button>
              <Button
                color="secondary"
                size="sm"
                active={game === null}
                onClick={() => {
                  setGame(null);
                  action({
                    variables: {systemId, upgradeBoard: null},
                  });
                }}
              >
                Nothing
              </Button>
            </ButtonGroup>
          </div>
          {game && (
            <div style={{display: "flex"}}>
              <ListGroup
                style={{flex: 1, maxHeight: "200px", overflowY: "auto"}}
              >
                {(game === "lumen" ? lumenData : robozzleData).map(t => (
                  <ListGroupItem
                    key={t.id}
                    active={
                      upgradeBoard &&
                      t.id ===
                        upgradeBoard
                          .replace(`lumen-`, "")
                          .replace(`robozzle-`, "")
                    }
                    onClick={() =>
                      action({
                        variables: {systemId, upgradeBoard: `${game}-${t.id}`},
                      })
                    }
                  >
                    {t.name}
                  </ListGroupItem>
                ))}
              </ListGroup>
              {upgradeBoard && (
                <div style={{flex: 2, maxHeight: "200px"}}>
                  {game === "lumen" ? (
                    <LaserGame
                      id={upgradeBoard && upgradeBoard.replace("lumen-", "")}
                    />
                  ) : (
                    <RobozzleGame
                      id={upgradeBoard && upgradeBoard.replace("robozzle-", "")}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Mutation>
  );
};

const SYSTEM_QUERY = gql`
  query Systems($simulatorId: ID!) {
    systems(simulatorId: $simulatorId) {
      id
      name
      type
      displayName
      upgradeName
      upgradeBoard
      upgradeMacros {
        id
        event
        args
        delay
      }
    }
  }
`;

const Upgrade = ({
  id,
  upgradeName,
  upgradeBoard,
  upgradeMacros = [],
  simulatorId,
}) => {
  return (
    <>
      <Mutation
        mutation={gql`
          mutation UpdateName(
            $id: ID!
            $name: String
            $displayName: String
            $upgradeName: String
          ) {
            updateSystemName(
              systemId: $id
              name: $name
              displayName: $displayName
              upgradeName: $upgradeName
            )
          }
        `}
        refetchQueries={[
          {query: GENERIC_QUERY, variables: {id, simulatorId}},
          {query: SYSTEM_QUERY, variables: {simulatorId}},
        ]}
      >
        {action => (
          <Fragment>
            <FormGroup>
              <Label>
                Upgrade Name{" "}
                <small>The name of the system when it is upgraded.</small>
                <Input
                  type="text"
                  defaultValue={upgradeName || ""}
                  onBlur={e =>
                    action({variables: {id, upgradeName: e.target.value}})
                  }
                />
              </Label>
            </FormGroup>
          </Fragment>
        )}
      </Mutation>
      <Mutation
        mutation={gql`
          mutation SetUpgradeMacros($id: ID!, $macros: [TimelineItemInput]!) {
            updateSystemUpgradeMacros(systemId: $id, upgradeMacros: $macros)
          }
        `}
        refetchQueries={[
          {query: GENERIC_QUERY, variables: {id, simulatorId}},
          {query: SYSTEM_QUERY, variables: {simulatorId}},
        ]}
      >
        {(action, {client}) => (
          <ConfigureMacro
            label={"Triggered when the system is upgraded."}
            action={action}
            id={id}
            macros={upgradeMacros}
            client={client}
          />
        )}
      </Mutation>
      <ExocompControl
        simulatorId={simulatorId}
        systemId={id}
        upgradeBoard={upgradeBoard}
      />
    </>
  );
};
export default Upgrade;
