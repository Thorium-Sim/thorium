import {DECODING_QUERY, DECODING_SUB} from "components/cards/CommDecoding";
import systems from "../data/systems";
import {
  DECODING_CORE_QUERY,
  DECODING_CORE_SUBSCRIPTION,
} from "components/cards/CommDecoding/core";
import {
  LONG_RANGE_COMM_QUERY,
  LONG_RANGE_COMM_SUB,
} from "components/cards/LongRangeComm";

export default [
  {
    request: {
      query: DECODING_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        longRangeCommunications: systems.longRangeCommunications,
      },
    },
  },
  {
    request: {
      query: DECODING_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: DECODING_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        longRangeCommunications: systems.longRangeCommunications,
      },
    },
  },
  {
    request: {
      query: DECODING_CORE_SUBSCRIPTION,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: LONG_RANGE_COMM_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {longRangeCommunications: systems.longRangeCommunications},
    },
  },
  {
    request: {
      query: LONG_RANGE_COMM_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {longRangeCommunicationsUpdate: systems.longRangeCommunications},
    },
  },
];
