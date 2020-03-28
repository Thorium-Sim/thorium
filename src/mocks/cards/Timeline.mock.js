import {
  TimelineMissionDocument,
  TimelineSimulatorDocument,
} from "generated/graphql";
import simulators from "../data/simulators";
import missions from "../data/missions";
import IntrospectionMock from "./Introspection.mock";
export default [
  {
    request: {
      query: TimelineMissionDocument,
    },
    result: {
      data: {
        missionsUpdate: missions,
      },
    },
  },
  {
    request: {
      query: TimelineSimulatorDocument,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        simulatorsUpdate: simulators,
      },
    },
  },
  ...IntrospectionMock,
];
