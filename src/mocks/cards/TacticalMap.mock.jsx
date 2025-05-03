import {
  TACTICALMAP_QUERY,
  TACTICALMAP_SUB,
} from "../../components/views/TacticalMap";
import tacticalMap from "../data/tacticalMap";
export default [
  {
    request: {
      query: TACTICALMAP_QUERY,
      variables: {id: null},
    },
    result: {
      data: {
        tacticalMap: null,
      },
    },
  },
  {
    request: {
      query: TACTICALMAP_SUB,
      variables: {id: null},
    },
    result: {
      data: {
        tacticalMapUpdate: null,
      },
    },
  },
  {
    request: {
      query: TACTICALMAP_QUERY,
      variables: {id: "test-map"},
    },
    result: {
      data: {
        tacticalMap,
      },
    },
  },
  {
    request: {
      query: TACTICALMAP_SUB,
      variables: {id: "test-map"},
    },
    result: {
      data: {
        tacticalMapUpdate: tacticalMap,
      },
    },
  },
];
