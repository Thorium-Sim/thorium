import * as React from "react";

export type ActionType =
  | "dragging"
  | "dropped"
  | "recenter"
  | "zoomScale"
  | "camera"
  | "selected"
  | "entityPointerDown"
  | "selecting"
  | "lighting"
  | "measure"
  | "speed"
  | "position"
  | "time"
  | "controllingEntity";

interface CanvasContextState {
  dragging: boolean;
  camera: boolean;
  zoomScale: boolean;
  selected: string[];
  selecting: boolean;
  lighting: boolean;
  recenter: {};
  // Measurement stuff
  measuring: boolean;
  measured: boolean;
  speed: number;
  timeInSeconds: number;
  position: [number, number, number];
  controllingEntityId: string;
}
interface CanvasContextAction {
  type: ActionType;
  tf?: boolean;
  selected?: string[];
  speed?: number;
  position?: [number, number, number];
  timeInSeconds?: number;
  shiftKey?: boolean;
  id?: string;
}
const canvasContextDefault: CanvasContextState = {
  dragging: false,
  camera: false,
  zoomScale: false,
  recenter: {},
  selected: [],
  selecting: false,
  lighting: true,
  measuring: false,
  measured: false,
  speed: 28,
  timeInSeconds: 60,
  position: [0, 0, 0],
  controllingEntityId: localStorage.getItem("sandbox-controlling-id") || "",
};

const canvasContextReducer = (
  state: CanvasContextState,
  action: CanvasContextAction,
): CanvasContextState => {
  switch (action.type) {
    case "dragging":
      return {...state, dragging: true};
    case "dropped":
      return {...state, dragging: false};
    case "recenter":
      return {...state, recenter: {}};
    case "zoomScale":
      return {...state, zoomScale: action.tf || false};
    case "camera":
      return {...state, camera: action.tf || false};
    case "selected":
      return {...state, selected: action.selected || []};
    case "entityPointerDown":
      if (!action.id) return state;
      if (action.shiftKey) {
        if (state.selected.includes(action.id)) {
          return {
            ...state,
            selected: state.selected.filter(s => s !== action.id),
          };
        }
        return {...state, selected: [...state.selected, action.id]};
      }
      if (!state.selected || !state.selected.includes(action.id)) {
        return {...state, selected: [action.id]};
      }
      return state;
    case "selecting":
      return {...state, selecting: action.tf || false};
    case "lighting":
      return {...state, lighting: action.tf || false};
    case "measure":
      if (state.measuring)
        return {
          ...state,
          measuring: false,
          measured: false,
          position: [0, 0, 0],
        };
      else return {...state, measuring: true};
    case "speed":
      if (!action.speed) return state;
      return {...state, speed: action.speed};
    case "position":
      if (!action.position) return state;
      return {...state, position: action.position, measured: true};
    case "time":
      if (!action.timeInSeconds) return state;
      return {...state, timeInSeconds: action.timeInSeconds};
    case "controllingEntity":
      if (!action.id) return state;
      localStorage.setItem("sandbox-controlling-id", action.id);
      return {...state, controllingEntityId: action.id};
    default:
      return state;
  }
};

export const CanvasContext = React.createContext<
  [CanvasContextState, React.Dispatch<CanvasContextAction>]
>([canvasContextDefault, () => {}]);

type ReducerSignature = (
  state: CanvasContextState,
  action: CanvasContextAction,
) => CanvasContextState;

const CanvasContextProvider: React.FC = ({children}) => {
  const value = React.useReducer<ReducerSignature>(
    canvasContextReducer,
    canvasContextDefault,
  );
  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
