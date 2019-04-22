import React from "react";
import "./ShipLogo.scss";

export default ({ simulator }) => {
  const { assets } = simulator;
  return (
    <div className="ShipLogo">
      <img
        alt="Ship Logo"
        role="presentation"
        className="logo img-fluid"
        src={`/assets/${assets.logo}`}
      />
    </div>
  );
};
