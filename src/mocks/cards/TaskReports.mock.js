import {
  TASK_REPORTS_CORE_QUERY,
  TASK_REPORTS_CORE_SUB,
} from "components/views/TaskReports/core";
import taskReport from "../data/taskReports";
import systems from "../data/systems";
export default [
  {
    request: {
      query: TASK_REPORTS_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        taskReport,
        systems: Object.values(systems).map(([key, value]) => ({
          id: key,
          name: key,
          displayName: key,
          type: key,
          __typename: "System",
        })),
        exocomps: [],
      },
    },
  },
  {
    request: {
      query: TASK_REPORTS_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        taskReportUpdate: taskReport,
      },
    },
  },
];
