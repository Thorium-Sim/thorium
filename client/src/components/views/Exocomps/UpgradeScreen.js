import React from "react";
import LaserGame from "helpers/laserGame";
import RobozzleGame from "helpers/robozzleGame";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const COMPLETE_UPGRADE = gql`
  mutation CompleteUpgrade($exocompId: ID!) {
    exocompCompleteUpgrade(exocomp: $exocompId)
  }
`;
const UpgradeScreen = React.memo(
  ({
    exocompId,
    clearUpgradeBoard,
    destination: { upgradeBoard, displayName }
  }) => {
    return (
      <div>
        <h2>Upgrading {displayName}</h2>
        {upgradeBoard && (
          <Mutation mutation={COMPLETE_UPGRADE} variables={{ exocompId }}>
            {action => (
              <div
                style={{
                  flex: 2,
                  maxHeight: "200px",
                  display: "flex",
                  justifyContent: "center"
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
  }
);

export default UpgradeScreen;
