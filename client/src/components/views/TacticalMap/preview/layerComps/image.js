import React from "react";

const Image = ({ image, opacity }) => {
  return (
    <div className="tactical-image" style={{ opacity }}>
      <img src={`/assets${image}`} alt="Background" />
    </div>
  );
};
export default Image;
