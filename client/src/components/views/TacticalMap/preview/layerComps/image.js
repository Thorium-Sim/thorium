import React from "react";
import { Asset } from "../../../../../helpers/assets";

const Image = ({ image, opacity }) => {
  return (
    <div className="tactical-image" style={{ opacity }}>
      <Asset asset={image}>
        {({ src }) => <img src={src} alt="Background" />}
      </Asset>
    </div>
  );
};
export default Image;
