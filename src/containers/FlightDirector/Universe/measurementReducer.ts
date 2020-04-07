export interface MeasurementState {
  measuring: boolean;
  measured: boolean;
  speed: number;
  timeInSeconds: number;
  position: [number, number, number];
}
export interface MeasurementAction {
  type: "start" | "cancel" | "speed" | "position" | "time";
  speed?: number;
  position?: [number, number, number];
  timeInSeconds?: number;
}
export type MeasurementReducerSignature = (
  state: MeasurementState,
  action: MeasurementAction,
) => MeasurementState;

export default function reducer(
  state: MeasurementState,
  action: MeasurementAction,
): MeasurementState {
  switch (action.type) {
    case "cancel":
      return {...state, measuring: false, measured: false, position: [0, 0, 0]};
    case "start":
      return {...state, measuring: true};
    case "speed":
      if (!action.speed) return state;
      return {...state, speed: action.speed};
    case "position":
      if (!action.position) return state;
      return {...state, position: action.position, measured: true};
    case "time":
      if (!action.timeInSeconds) return state;
      return {...state, timeInSeconds: action.timeInSeconds};
    default:
      return state;
  }
}
