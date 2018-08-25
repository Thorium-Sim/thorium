import React from "react";

const DamageOverlay = ({ shield }) => {
  return (
    <div className="damageOverlay">
      <h1>{shield.name} shields Damaged</h1>
    </div>
  );
};

export default DamageOverlay;
