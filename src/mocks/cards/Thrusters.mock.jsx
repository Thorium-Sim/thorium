import {
  THRUSTER_QUERY,
  THRUSTER_SUB,
  ROTATION_CHANGE_SUB,
} from "components/views/Thrusters";
import systems from "../data/systems";
import {
  THRUSTER_CORE_QUERY,
  ROTATION_CHANGE_CORE_SUB,
} from "components/views/Thrusters/core";
export default [
  {
    request: {
      query: THRUSTER_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        thrusters: systems.thrusters,
      },
    },
  },
  {
    request: {
      query: THRUSTER_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        systemsUpdate: systems.thrusters,
      },
    },
  },
  {
    request: {
      query: ROTATION_CHANGE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        rotationChange: systems.thrusters,
      },
    },
  },
  {
    request: {
      query: THRUSTER_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        thrusters: systems.thrusters,
      },
    },
  },
  {
    request: {
      query: ROTATION_CHANGE_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        rotationChange: systems.thrusters,
      },
    },
  },
];
