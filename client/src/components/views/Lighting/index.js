import React from "react";

const LightingCore = ({ clients, simulator: { id } }) => {
  const ecsClient = clients.find(
    c => c.id.indexOf("ECS") === 0 && c.simulator && c.simulator.id === id
  );
  if (!ecsClient) return null;
  return <div className="lighting">Lighting</div>;
};

export default LightingCore;
