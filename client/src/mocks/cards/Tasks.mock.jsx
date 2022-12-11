import {TASK_QUERY, TASK_SUB} from "components/cards/Tasks";
import {
  TASK_CORE_QUERY,
  TASK_TEMPLATE_SUB,
  TASK_CORE_SUB,
} from "components/cards/Tasks/core";
import {TASK_DEFINITION_QUERY} from "components/cards/Tasks/core/TaskCreator";

import tasks from "../data/tasks";
import taskDefinitions from "../data/taskDefinitions";
export default [
  {
    request: {
      query: TASK_QUERY,
      variables: {simulatorId: "test", station: "Test Station"},
    },
    result: {
      data: {
        tasks,
      },
    },
  },
  {
    request: {
      query: TASK_SUB,
      variables: {simulatorId: "test", station: "Test Station"},
    },
    result: {
      data: {
        tasksUpdate: tasks,
      },
    },
  },
  {
    request: {
      query: TASK_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        tasks,
        taskTemplates: [],
      },
    },
  },
  {
    request: {
      query: TASK_DEFINITION_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        taskDefinitions,
      },
    },
  },
  {
    request: {
      query: TASK_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        tasks,
        taskTemplates: [],
      },
    },
  },
  {
    request: {
      query: TASK_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        tasksUpdate: tasks,
      },
    },
  },
  {
    request: {
      query: TASK_TEMPLATE_SUB,
      variables: {},
    },
    result: {
      data: {
        taskTemplatesUpdate: [],
      },
    },
  },
];
