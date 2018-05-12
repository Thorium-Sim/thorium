import React from "react";
import { Asset } from "../../../../../helpers/assets";

const Image = ({ image }) => {
  return (
    <div className="tactical-image">
      <Asset asset={image}>
        {({ src }) => <img src={src} alt="Background" />}
      </Asset>
    </div>
  );
};
export default Image;
