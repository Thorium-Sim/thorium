import React from "react";
import data from "./data.json";
import LaserGame from "./LaserGame.js";
import "./styles.scss";

function App({id, onWin = () => {}}) {
  const game = React.useMemo(() => {
    const gamedata = data.find(d => d.id === id);
    if (!gamedata) return null;
    const objects = gamedata.data
      .replace(/\\n/g, "\n")
      .split("\n")
      .map(d => d.split(","));
    const height = objects.length;
    const width = objects[0].length;
    return {objects, height, width};
  }, [id]);
  return (
    <div className="laserGame-root">
      <div className="laser-game">
        {game && <LaserGame {...game} onWin={onWin} />}
      </div>
    </div>
  );
}

export default App;
