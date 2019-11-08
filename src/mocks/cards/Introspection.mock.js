import {MacroConfigQuery} from "containers/FlightDirector/MissionConfig/EventPicker";
import introspection from "../data/introspection";
export default [
  {
    request: {
      query: MacroConfigQuery,
    },
    result: {
      data: introspection,
    },
  },
];
