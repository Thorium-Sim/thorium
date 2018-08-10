import React from "react";
import LayoutGlass from "./index";
import LayoutGlassViewscreen from "./viewscreen";

const LayoutGlassLite = props => <LayoutGlass {...props} lite />;
export const LayoutGlassLiteViewscreen = props => (
  <LayoutGlassViewscreen {...props} lite />
);
export default LayoutGlassLite;
