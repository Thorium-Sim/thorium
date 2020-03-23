import * as reactrouterdom from "react-router-dom";
import React from "react";

declare module "react-router-dom" {
  export const useNavigate: () => Function;
  export const Routes: React.FC;
}
