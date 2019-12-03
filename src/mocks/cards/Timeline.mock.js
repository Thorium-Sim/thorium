import {TIMELINE_QUERY, TIMELINE_SUB} from "components/views/Timeline";
import simulators from "../data/simulators";
import missions from "../data/missions";
import IntrospectionMock from "./Introspection.mock";
import {
  TIMELINE_THUMBNAIL_QUERY,
  TIMELINE_THUMBNAIL_SUB,
} from "components/views/Timeline/thumbnailData";
export default [
  {
    request: {
      query: TIMELINE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        missions,
        simulators,
      },
    },
  },
  {
    request: {
      query: TIMELINE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        simulatorsUpdate: simulators,
      },
    },
  },
  {
    request: {
      query: TIMELINE_THUMBNAIL_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        missions,
        simulators,
      },
    },
  },
  {
    request: {
      query: TIMELINE_THUMBNAIL_SUB,
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
