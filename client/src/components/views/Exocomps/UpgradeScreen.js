import React from "react";
import LaserGame from "helpers/laserGame";
import RobozzleGame from "helpers/robozzleGame";

const UpgradeScreen = ({ destination: { upgradeBoard, displayName } }) => {
  console.log("Upgrade", upgradeBoard);
  return (
    <div>
      <h2>Upgrading {displayName}</h2>
      {upgradeBoard && (
        <div style={{ flex: 2, maxHeight: "200px" }}>
          {upgradeBoard.includes("lumen") ? (
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
  );
};

export default UpgradeScreen;
