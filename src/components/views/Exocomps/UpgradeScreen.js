import { Mutation, gql } from "@apollo/client";
import React from "react";
import LaserGame from "helpers/laserGame";
import RobozzleGame from "helpers/robozzleGame";

const COMPLETE_UPGRADE = gql`
  mutation CompleteUpgrade($exocompId: ID!) {
    exocompCompleteUpgrade(exocomp: $exocompId)
  }
`;
const UpgradeScreen = React.memo(
  ({exocompId, clearUpgradeBoard, destination}) => {
    if (!destination) return;
    const {upgradeBoard, displayName} = destination;
    return (
      <div>
        <h2>Upgrading {displayName}</h2>
        {upgradeBoard && (
          <Mutation mutation={COMPLETE_UPGRADE} variables={{exocompId}}>
            {action => (
              <div
                style={{
                  flex: 2,
                  maxHeight: "200px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {upgradeBoard.includes("lumen") ? (
                  <LaserGame
                    onWin={() => {
                      clearUpgradeBoard();
                      action();
                    }}
                    id={upgradeBoard && upgradeBoard.replace("lumen-", "")}
                  />
                ) : (
                  <RobozzleGame
                    onWin={() => {
                      clearUpgradeBoard();
                      action();
                    }}
                    id={upgradeBoard && upgradeBoard.replace("robozzle-", "")}
                  />
                )}
              </div>
            )}
          </Mutation>
        )}
      </div>
    );
  },
);

export default UpgradeScreen;
