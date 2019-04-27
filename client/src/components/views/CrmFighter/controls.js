import React from "react";
import { Button } from "reactstrap";

const Controls = ({ phaserLevel }) => {
  return (
    <div className="controls">
      <Button block color="warning" disabled={phaserLevel < 0.05}>
        Fire Phaser
      </Button>
      <Button block color="warning">
        Fire Torpedo
      </Button>
      <Button block color="info">
        Raise Shields
      </Button>
      <Button block color="danger">
        Dock Viper
      </Button>
    </div>
  );
};
export default Controls;
